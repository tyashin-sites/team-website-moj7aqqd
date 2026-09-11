"use client";

/**
 * ReturnsCalculator — an honest what-if tool for the ROI guide.
 *
 * The visitor supplies THEIR numbers (orders, order value, return rate, cost
 * per return, conversion). The only assumptions are the two sliders, both
 * labelled with their provenance: the returns reduction defaults to a
 * conservative 40% (Thridify's published client outcome is 75%; the slider
 * lets the reader pick anything from 10% to 75%), and the conversion uplift
 * defaults to +50% (Thridify's published outcome is 3× = +200%).
 * Nothing here is presented as a guarantee — see the copy around it.
 */

import { useMemo, useState } from "react";

const CURRENCIES = ["USD", "CAD", "INR", "EUR", "GBP"] as const;
type Currency = (typeof CURRENCIES)[number];

const LOCALE: Record<Currency, string> = {
  USD: "en-US",
  CAD: "en-CA",
  INR: "en-IN",
  EUR: "de-DE",
  GBP: "en-GB",
};

function money(n: number, c: Currency) {
  return new Intl.NumberFormat(LOCALE[c], {
    style: "currency",
    currency: c,
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold">{label}</span>
      {hint && <span className="block text-xs text-foreground/50 mt-0.5">{hint}</span>}
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-foreground/15 bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition tt-mono";

export function ReturnsCalculator() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [orders, setOrders] = useState(400);
  const [aov, setAov] = useState(900);
  const [returnRate, setReturnRate] = useState(20);
  const [returnCost, setReturnCost] = useState(120);
  const [reduction, setReduction] = useState(40);
  const [convUplift, setConvUplift] = useState(50);

  const r = useMemo(() => {
    const returnsNow = orders * (returnRate / 100);
    const costNow = returnsNow * returnCost;
    const returnsAfter = returnsNow * (1 - reduction / 100);
    const costAfter = returnsAfter * returnCost;
    const saved = costNow - costAfter;
    const revenueNow = orders * aov;
    const extraOrders = orders * (convUplift / 100);
    const extraRevenue = extraOrders * aov;
    return {
      returnsNow,
      returnsAfter,
      costNow,
      costAfter,
      saved,
      savedYear: saved * 12,
      revenueNow,
      extraOrders,
      extraRevenue,
      extraRevenueYear: extraRevenue * 12,
    };
  }, [orders, aov, returnRate, returnCost, reduction, convUplift]);

  return (
    <div className="card p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Currency">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className={inputCls}
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Orders per month">
              <input
                type="number"
                min={0}
                value={orders}
                onChange={(e) => setOrders(Math.max(0, Number(e.target.value)))}
                className={inputCls}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Average order value">
              <input
                type="number"
                min={0}
                value={aov}
                onChange={(e) => setAov(Math.max(0, Number(e.target.value)))}
                className={inputCls}
              />
            </Field>
            <Field label="Current return rate (%)" hint="Online furniture runs 19–23%">
              <input
                type="number"
                min={0}
                max={100}
                value={returnRate}
                onChange={(e) => setReturnRate(Math.min(100, Math.max(0, Number(e.target.value))))}
                className={inputCls}
              />
            </Field>
          </div>
          <Field
            label="Cost to process one return"
            hint="Shipping both ways, inspection, restock or write-off"
          >
            <input
              type="number"
              min={0}
              value={returnCost}
              onChange={(e) => setReturnCost(Math.max(0, Number(e.target.value)))}
              className={inputCls}
            />
          </Field>
          <Field
            label={`Expected returns reduction: ${reduction}%`}
            hint="Default 40% is conservative. Thridify's published client outcome is 75%."
          >
            <input
              type="range"
              min={10}
              max={75}
              step={5}
              value={reduction}
              onChange={(e) => setReduction(Number(e.target.value))}
              className="w-full accent-[#007050]"
            />
          </Field>
          <Field
            label={`Expected conversion uplift: +${convUplift}%`}
            hint="Default +50%. Thridify's published outcome is 3× (+200%)."
          >
            <input
              type="range"
              min={10}
              max={200}
              step={10}
              value={convUplift}
              onChange={(e) => setConvUplift(Number(e.target.value))}
              className="w-full accent-[#007050]"
            />
          </Field>
        </div>

        <div className="space-y-4" aria-live="polite">
          <div className="rounded-2xl bg-primary/5 border border-primary/15 p-5">
            <p className="eyebrow">Returns today</p>
            <p className="mt-2 tt-mono text-sm text-foreground/60">
              {Math.round(r.returnsNow)} returns / month
            </p>
            <p className="mt-1 font-heading text-3xl font-semibold tracking-tight">
              {money(r.costNow, currency)}
              <span className="text-base font-normal text-foreground/50"> / month</span>
            </p>
          </div>
          <div className="rounded-2xl bg-primary/10 border border-primary/25 p-5">
            <p className="eyebrow">Saved on returns</p>
            <p className="mt-2 tt-mono text-sm text-foreground/60">
              {Math.round(r.returnsAfter)} returns / month after a {reduction}% reduction
            </p>
            <p className="mt-1 font-heading text-3xl font-semibold tracking-tight text-primary">
              {money(r.saved, currency)}
              <span className="text-base font-normal text-foreground/50"> / month</span>
            </p>
            <p className="mt-1 text-sm text-foreground/60">
              ≈ {money(r.savedYear, currency)} a year
            </p>
          </div>
          <div className="rounded-2xl bg-primary/10 border border-primary/25 p-5">
            <p className="eyebrow">Added revenue from conversion</p>
            <p className="mt-2 tt-mono text-sm text-foreground/60">
              +{Math.round(r.extraOrders)} orders / month at +{convUplift}%
            </p>
            <p className="mt-1 font-heading text-3xl font-semibold tracking-tight text-primary">
              {money(r.extraRevenue, currency)}
              <span className="text-base font-normal text-foreground/50"> / month</span>
            </p>
            <p className="mt-1 text-sm text-foreground/60">
              ≈ {money(r.extraRevenueYear, currency)} a year
            </p>
          </div>
          <p className="text-xs text-foreground/50 leading-relaxed">
            A what-if model on your inputs, not a forecast. Photography and inventory
            savings are excluded on purpose — add them once you have your own figures.
          </p>
        </div>
      </div>
    </div>
  );
}
