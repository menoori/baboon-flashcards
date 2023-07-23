export class DateManager {
  constructor() {}

  getDifference(
    oldDate: number,
    newDate: number,
    format?: "weeks" | "days" | "hours" | "minutes" | "seconds"
  ): number {
    const difference = newDate - oldDate;

    const seconds = difference / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;

    switch (format) {
      case "weeks":
        return weeks;
      case "days":
        return days;
      case "hours":
        return hours;
      case "minutes":
        return minutes;
      case "seconds":
        return seconds;
      default:
        return difference;
    }
  }

  getFormattedDate(
    date: Date | number | string,
    format:
      | "YYMMDD"
      | "YYYY-MM-DD"
      | "YYYY-MM-DD hh:mm"
      | "YYMMDD hh:mm"
      | "YYMMDD hh:mm:ss"
      | "hh:mm:ss"
      | "hh:mm"
  ): string {
    const prepare = new Date(date);

    const year = prepare.getFullYear();
    const yearTwo = year.toString().slice(2, 4);
    const month =
      prepare.getMonth() < 9
        ? "0" + (prepare.getMonth() + 1)
        : prepare.getMonth() + 1;
    const day =
      prepare.getDate() < 10 ? "0" + prepare.getDate() : prepare.getDate();
    const hours =
      prepare.getHours() < 10 ? "0" + prepare.getHours() : prepare.getHours();
    const minutes =
      prepare.getMinutes() < 10
        ? "0" + prepare.getMinutes()
        : prepare.getMinutes();
    const seconds =
      prepare.getSeconds() < 10
        ? "0" + prepare.getSeconds()
        : prepare.getSeconds();

    switch (format) {
      case "YYMMDD":
        return `${yearTwo}${month}${day}`;
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;
      case "YYYY-MM-DD":
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      case "YYMMDD hh:mm":
        return `${yearTwo}${month}${day} ${hours}:${minutes}`;
      case "YYMMDD hh:mm:ss":
        return `${yearTwo}${month}${day} ${hours}:${minutes}:${seconds}`;
      case "hh:mm:ss":
        return `${hours}:${minutes}:${seconds}`;
      case "hh:mm":
        return `${hours}:${minutes}`;
      default:
        return `${yearTwo}${month}${day}`;
    }
  }
}
