const MS_PER_DAY = 24 * 60 * 60 * 1000;

const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

export const daysBetween = (from, to) =>
  Math.ceil((startOfDay(to) - startOfDay(from)) / MS_PER_DAY);

export const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    const now = new Date();

    const opts =
      d.getFullYear() === now.getFullYear()
        ? { day: "numeric", month: "short" }
        : { day: "numeric", month: "short", year: "numeric" };

    return new Intl.DateTimeFormat("en-IN", opts).format(d);
  } catch {
    return dateStr;
  }
};

export const plural = (n, singular, pluralForm) =>
  n === 1 ? `1 ${singular}` : `${n} ${pluralForm ?? singular + "s"}`;

export const computeEffectiveAvailability = (car) => {
  const today = new Date();

  if (Array.isArray(car.bookings) && car.bookings.length) {
    const overlapping = car.bookings
      .map((b) => {
        const pickup =
          b.pickupDate || b.startDate || b.start || b.from;
        const ret =
          b.returnDate || b.endDate || b.end || b.to;
        if (!pickup || !ret) return null;
        return {
          pickup: new Date(pickup),
          return: new Date(ret),
        };
      })
      .filter(Boolean)
      .filter(
        (b) =>
          startOfDay(b.pickup) <= startOfDay(today) &&
          startOfDay(today) <= startOfDay(b.return)
      );

    if (overlapping.length) {
      overlapping.sort((a, b) => b.return - a.return);
      return {
        state: "booked",
        until: overlapping[0].return.toISOString(),
        source: "bookings",
      };
    }
  }

  if (car.availability) {
    const a = car.availability;

    if (a.state === "booked" && a.until) {
      return {
        state: "booked",
        until: a.until,
        source: "availability",
      };
    }

    if (
      a.state === "available_until_reservation" &&
      Number(a.daysAvailable ?? -1) === 0
    ) {
      return {
        state: "booked",
        until: a.until ?? null,
        nextBookingStarts: a.nextBookingStarts,
        source: "availability-res-starts-today",
      };
    }

    return { ...a, source: "availability" };
  }

  return { state: "fully_available", source: "none" };
};

export const computeAvailableMeta = (untilIso) => {
  if (!untilIso) return null;
  try {
    const until = new Date(untilIso);
    const available = new Date(until);
    available.setDate(available.getDate() + 1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      availableIso: available.toISOString(),
      daysUntilAvailable: daysBetween(today, available),
    };
  } catch {
    return null;
  }
};

export const isBookDisabled = (car, effective) => {
  if (car?.status && car.status !== "available") return true;
  if (!effective) return false;
  return effective.state === "booked";
};
