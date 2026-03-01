export function getCurrentDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function calculateTimeToANumber(dateStr: string): number {
    if (!dateStr) throw new Error('Time value is null');
    let dateStrSplit = dateStr.split(':');
    let hours = parseInt(dateStrSplit[0]);
    let minutes = parseInt(dateStrSplit[1]);
    let seconds = parseInt(dateStrSplit[2]);
    return hours * 3600 + minutes * 60 + seconds;
}