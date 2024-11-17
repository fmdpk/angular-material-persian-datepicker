import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import  jalaliMoment from 'jalali-moment';
function convertToPersianDigits(value: string | number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return value
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);
}

@Injectable()
export class JalaliDateAdapter extends DateAdapter<jalaliMoment.Moment> {
  private readonly localeData = jalaliMoment.localeData('fa');

  constructor() {
    super();

    jalaliMoment.updateLocale('fa', {
      week: {
        dow: 6,
        doy: 12,
      },
    });

    // تنظیم زبان به فارسی
    super.setLocale('fa');
  }

  getYear(date: jalaliMoment.Moment): number {
    return this.clone(date).jYear();
  }

  getMonth(date: jalaliMoment.Moment): number {
    return this.clone(date).jMonth();
  }

  getDate(date: jalaliMoment.Moment): number {
    return this.clone(date).jDate();
  }

  getDayOfWeek(date: jalaliMoment.Moment): number {
    const day = date.day();
    return (day + 1) % 7;
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const persianMonths = [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ];
    return style === 'narrow'
      ? persianMonths.map((month) => month[0])
      : persianMonths;
  }

  getDateNames(): string[] {
    return Array.from({ length: 31 }, (_, i) => convertToPersianDigits(i + 1));
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const persianWeekdays = [
      'شنبه',   // Saturday
      'یکشنبه', // Sunday
      'دوشنبه', // Monday
      'سه‌شنبه', // Tuesday
      'چهارشنبه', // Wednesday
      'پنج‌شنبه', // Thursday
      'جمعه',   // Friday
    ];


    return style === 'narrow'
      ? persianWeekdays.map((day) => day[0])
      : persianWeekdays;
  }



  getYearName(date: jalaliMoment.Moment): string {
    return convertToPersianDigits(this.clone(date).jYear());
  }

  getFirstDayOfWeek(): number {
    return 0; // Saturday
  }

  getNumDaysInMonth(date: jalaliMoment.Moment): number {
    return this.clone(date).jDaysInMonth();

  }

  clone(date: jalaliMoment.Moment): jalaliMoment.Moment {
    return date.clone().locale('fa');
  }

  createDate(year: number, month: number, date: number): jalaliMoment.Moment {
    return jalaliMoment().jYear(year).jMonth(month).jDate(date).startOf('day').locale('fa');
  }

  today(): jalaliMoment.Moment {
    return jalaliMoment().startOf('day').locale('fa');
  }

  parse(value: any, parseFormat: string | string[]): jalaliMoment.Moment | null {
    if (value && typeof value === 'string') {
      return jalaliMoment(value, parseFormat, 'fa').locale('fa');
    }
    return value ? jalaliMoment(value).locale('fa') : null;
  }

  format(date: jalaliMoment.Moment, displayFormat: string): string {
    date = this.clone(date);
    if (!this.isValid(date)) {
      throw Error('JalaliDateAdapter: Cannot format invalid date.');
    }
    return convertToPersianDigits(date.format(displayFormat));
  }


  addCalendarYears(date: jalaliMoment.Moment, years: number): jalaliMoment.Moment {
    return this.clone(date).add(years, 'jYear');
  }

  addCalendarMonths(date: jalaliMoment.Moment, months: number): jalaliMoment.Moment {
    return this.clone(date).add(months, 'jMonth');
  }

  addCalendarDays(date: jalaliMoment.Moment, days: number): jalaliMoment.Moment {
    return this.clone(date).add(days, 'day');
  }

  toIso8601(date: jalaliMoment.Moment): string {
    return this.clone(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }

  isDateInstance(obj: any): boolean {
    return jalaliMoment.isMoment(obj);
  }

  isValid(date: jalaliMoment.Moment): boolean {
    return this.clone(date).isValid();
  }

  invalid(): jalaliMoment.Moment {
    return jalaliMoment.invalid();
  }
}
