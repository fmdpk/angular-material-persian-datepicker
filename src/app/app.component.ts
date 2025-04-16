// import { hijriMoment } from 'moment-hijri';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { JALALI_MOMENT_FORMATS } from './JALALI_MOMENT_FORMATS';
import { JalaliDateAdapter } from './jalali-service';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import moment from 'jalali-moment';
import { HolidayEvents } from './events';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: JalaliDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'fa-IR' },
    { provide: MAT_DATE_FORMATS, useValue: JALALI_MOMENT_FORMATS },
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatMomentDateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Jalali-material-date-picker';
  counter = 0;
  // dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  //   if (view === 'month') {
  //     let momentDateShortFa = moment(cellDate)
  //       .locale('fa')
  //       .format('YYYY/MM/DD');

  //     let momentDateSub1 = moment(cellDate).subtract('day', 1).toDate();
  //     let arDate = new Intl.DateTimeFormat('en-GB-u-ca-islamic', {
  //       day: 'numeric',
  //       month: '2-digit',
  //       year: 'numeric',
  //     }).format(momentDateSub1);
  //     let hijriDate = arDate.split(' ')[0].split('/').reverse().join('/');
  //     let jalaliDay = momentDateShortFa.split('/')[2];
  //     let jalaliMonth = momentDateShortFa.split('/')[1];
  //     let hijriDay = hijriDate.split('/')[2];
  //     let hijriMonth = hijriDate.split('/')[1];

  //     let flag = false;
  //     HolidayEvents.forEach((item) => {
  //       if (item.date.type === 'shamsi') {
  //         let monthAndDate = item.date.date.join('/');
  //         if (monthAndDate === `${jalaliMonth}/${jalaliDay}`) {
  //           flag = true;
  //         }
  //       } else if (item.date.type === 'hijri') {
  //         let monthAndDate = item.date.date.join('/');
  //         if (monthAndDate === `${hijriMonth}/${hijriDay}`) {
  //           flag = true;
  //         }
  //       }
  //     });

  //     return flag ? 'holiday' : '';
  //   }

  //   return '';
  // };

  ngOnInit() {
    let holidays = HolidayEvents.filter((item) => item.is_holiday);
    console.log(holidays);
  }

  onDatepickerOpened() {
    setTimeout(() => {
      console.log(this.counter);
    }, 3000);
  }

  getEnglishDigit(str: string) {
    var persianNumbers = [
        /۰/g,
        /۱/g,
        /۲/g,
        /۳/g,
        /۴/g,
        /۵/g,
        /۶/g,
        /۷/g,
        /۸/g,
        /۹/g,
      ],
      arabicNumbers = [
        /٠/g,
        /١/g,
        /٢/g,
        /٣/g,
        /٤/g,
        /٥/g,
        /٦/g,
        /٧/g,
        /٨/g,
        /٩/g,
      ];

    if (typeof str === 'string') {
      for (var i = 0; i < 10; i++) {
        str = str
          .replace(persianNumbers[i], i.toString())
          .replace(arabicNumbers[i], i.toString());
      }
    }
    return str;
  }
}

function isHijriLeapYear(year: number) {
  const remainder = year % 30;
  const leapYears = new Set([2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29]);
  return leapYears.has(remainder);
}

function leap_persian(year: number) {
  const kabiseYears = [1, 5, 9, 13, 17, 22, 26, 30];
  const remainder = year % 33;
  return kabiseYears.includes(remainder);
  // return 682 > (682 * (((b - (0 < b ? 474 : 473)) % 2820) + 512)) % 2816;
}
