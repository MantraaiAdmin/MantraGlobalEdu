/** Convert HTML date + dropdown time (e.g. "10:00 AM") to ISO string. */
export function parseCounselingPreferredDate(date: string, time: string): string | undefined {
  if (!date) return undefined;

  let hours = 10;
  let minutes = 0;

  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (match) {
    hours = parseInt(match[1], 10);
    minutes = parseInt(match[2], 10);
    const meridiem = match[3].toUpperCase();
    if (meridiem === 'PM' && hours !== 12) hours += 12;
    if (meridiem === 'AM' && hours === 12) hours = 0;
  }

  const isoLocal = `${date}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
  const parsed = new Date(isoLocal);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error('Invalid preferred date or time. Please check your selection.');
  }

  return parsed.toISOString();
}
