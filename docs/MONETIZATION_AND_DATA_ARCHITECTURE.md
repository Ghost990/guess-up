# Hoppra monetization and data architecture

**Status:** implementation-ready direction; payments are not enabled
**Last reviewed:** 2026-08-02
**Current rollout rule:** every registered pack is playable, including packs later marked `premium`

## Decision

Use **Supabase Postgres + Supabase Auth** in an EU region as the account and entitlement backend, with **Stripe Checkout** for web purchases. Keep a provider-neutral purchase and entitlement ledger so later Apple App Store, Google Play, Paddle, promo, or admin grants can resolve through the same access API.

The game stays account-free until a player wants to buy or restore content. The current client uses `createOpenAccessEntitlementProvider()`, so commercial metadata can be introduced without accidentally creating a paywall.

Task content remains in immutable, versioned content releases. The database stores the catalogue and access rights, not thousands of task rows. Hungarian and English editions belong to the same commercial pack family so a language change never asks for a second purchase.

## Recommended schema

```text
profiles(user_id, stripe_customer_id, created_at, upgraded_at)
packs(id, slug, status, entitlement_scope)
pack_editions(id, pack_id, locale, current_release_id)
pack_releases(id, edition_id, version, schema_version, content_hash,
              content_location, manifest_json, min_app_version, published_at)

products(id, sku, kind, active)
product_packs(product_id, pack_id)
provider_products(provider, product_id, external_product_id,
                  external_price_id, currency, active)

orders(id, user_id, product_id, provider, status, currency, gross_amount,
       checkout_session_id, created_at, paid_at)
purchases(id, user_id, product_id, provider, external_transaction_id,
          status, purchased_at, refunded_at, raw_reference)
entitlements(id, user_id, pack_id, source_purchase_id, source,
             state, starts_at, ends_at)
webhook_events(provider, external_event_id, event_type, state,
               payload_hash, attempts, processed_at)
```

Important constraints:

- `pack_releases` are immutable and identified by semantic version plus content hash.
- Product SKU is stable and independent of any Stripe price ID.
- The browser sends only an internal SKU; the server resolves the active provider price.
- `webhook_events(provider, external_event_id)` is unique for idempotency.
- Entitlements record their source (`purchase`, `promo`, `admin`, `open-preview`) and lifecycle (`active`, `revoked`, `expired`). Do not replace this with a `hasPremium` boolean.
- Row Level Security applies to every public Supabase table. The service-role key is server-only.

## Identity and checkout flow

1. Anyone can start and complete a game locally without an account.
2. If cloud sync is later needed, create a Supabase anonymous user only at that point, with CAPTCHA and rate limits.
3. Before checkout, upgrade or sign in with email magic link, Google, or Apple so the purchase can be restored.
4. Create an internal pending order from a server-validated SKU.
5. Create hosted Stripe Checkout using the order UUID as the idempotency key.
6. Treat the success page as UX only. A verified webhook performs the transactional purchase upsert and entitlement grant.
7. Store processed event IDs, and handle delayed payment, refund, dispute, and chargeback events idempotently.

Stripe recommends webhook-based fulfillment because the buyer may never reach the success page, and webhook events may be delivered more than once: [Checkout fulfillment](https://docs.stripe.com/checkout/fulfillment), [Webhooks](https://docs.stripe.com/webhooks).

## Content delivery and offline access

While every pack is open, task payloads may remain bundled. Before a premium pack is sold, its full task payload must leave the public repository and JavaScript bundle; a UI lock cannot protect content already downloaded by the browser.

The paid-content phase should use:

- public metadata, cover, preview, and version information;
- authenticated, entitlement-checked payload download;
- immutable, hash-verified releases;
- user-namespaced IndexedDB storage instead of a shared service-worker cache;
- a documented 7–30 day offline entitlement ticket;
- entitlement revalidation and cached-payload removal on refund, logout, or account change.

The service worker keeps the public app shell and assets offline, but `/api`, authentication, checkout, webhook, and entitlement traffic remains network-only. Web delivery offers practical access control, not DRM.

## Product model

Start with one-time, non-consumable pack and bundle purchases. A subscription is justified only after the team can sustain a predictable content cadence. Keep the complete core game useful without payment and do not interrupt a round with advertising or purchase prompts.

Suggested rollout:

1. Current: all packs receive `open-preview` access.
2. Add Supabase schema, migrations, Auth, RLS, and entitlement resolver behind the existing interface.
3. Prove Stripe Checkout, webhook idempotency, restore, refund, and dispute behavior in sandbox.
4. Move only future premium payloads behind protected downloads.
5. Change packs from `open-preview` to `entitlement-required` with a server feature flag, one pack or cohort at a time.
6. Add Apple/Google adapters only if a native-store build is shipped.

## EU and Hungarian launch checklist

- Choose an EU Supabase region; Frankfurt is available: [Supabase regions](https://supabase.com/docs/guides/platform/regions).
- Review anonymous-account abuse and identity linking: [Supabase anonymous sign-ins](https://supabase.com/docs/guides/auth/auth-anonymous).
- Stripe supports businesses in Hungary: [Stripe global availability](https://stripe.com/global).
- Confirm EU B2C VAT and OSS obligations with a Hungarian accountant: [EU VAT OSS](https://vat-one-stop-shop.ec.europa.eu/index_en), [NAV OSS](https://oss.nav.gov.hu/).
- Stripe Tax can calculate tax, but ordinary Stripe Payments does not automatically make Stripe the merchant of record or complete local filing: [Stripe Tax](https://docs.stripe.com/tax/how-tax-works).
- Add explicit consent for immediate digital-content delivery and acknowledgement of the related withdrawal-right rule before purchase: [EU distance selling guidance](https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_en.htm).
- Complete privacy notice, retention, deletion/export, DPA, and data-minimization work: [GDPR principles](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en).

Legal, tax, invoicing, trademark, and store-policy reviews remain launch gates rather than engineering assumptions.
