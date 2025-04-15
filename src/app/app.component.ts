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
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    this.counter += 1;
    // Only highligh dates inside the month view.
    if (view === 'month') {
      // console.log(cellDate);

      let momentDate = moment(cellDate).toDate();
      let momentDateShortFa = moment(cellDate)
        .locale('fa')
        .format('YYYY/MM/DD');
      let momentDateShortAr = moment(cellDate)
        .locale('ar')
        .format('YYYY/MM/DD');
      let momentDateShortArSA = moment(cellDate)
        .locale('ar-SA')
        .format('YYYY/MM/DD');
      console.log(momentDateShortAr);
      console.log(momentDateShortArSA);

      let momentDateSub1 = moment(cellDate).subtract('day', 1).toDate();
      // let momentDateShort = moment(cellDate).locale('en').format('YYYY/MM/DD');
      // let momentDateShortArabic = moment(cellDate).toDate();
      let arDate = new Intl.DateTimeFormat('en-GB-u-ca-islamic', {
        day: 'numeric',
        month: '2-digit',
        year: 'numeric',
      }).format(momentDateSub1);

      // console.log(momentDate.toLocaleDateString('ar-SA'));
      // console.log(momentDateSub1.toLocaleDateString('ar-SA'));
      // console.log(arDate);
      // console.log(momentDateSub1);
      // console.log(momentDateShort);
      let hijriDate = arDate.split(' ')[0].split('/').reverse().join('/');

      const date = momentDate.getDate();
      // const month = momentDate.getMonth();
      let day = momentDateShortFa.split('/')[2];
      let month = momentDateShortFa.split('/')[1];
      let hijriDay = hijriDate.split('/')[2];
      let hijriMonth = hijriDate.split('/')[1];
      // console.log(month);
      // console.log(day);
      // console.log(hijriMonth);
      // console.log(hijriDay);
      // console.log(momentDateShortFa);
      // console.log(hijriDate);
      // console.log(`${hijriMonth}/${hijriDay}`);

      let flag = false;
      HolidayEvents.forEach((item) => {
        if (
          item.event_name ===
            'ولادت حضرت قائم عجل الله تعالی فرجه و جشن نیمه شعبان' &&
          `${hijriMonth}/${hijriDay}` === '08/15'
        ) {
          console.log(item.event_name);
        }
        if (item.date.type === 'shamsi') {
          // console.log('shamsi-sham');

          let cDate = item.date.date.join('/');
          // console.log(cDate);
          // // console.log(`${hijriMonth}/${hijriDay}`);
          // console.log(`${month}/${day}`);
          if (cDate === `${month}/${day}`) {
            flag = true;
          }

          // item.date.date.forEach((elem) => {
          //   if (elem === month || elem === day) {
          //     console.log('shamsi');

          //   }
          // });
        } else if (item.date.type === 'hijri') {
          let cDate = item.date.date.join('/');
          console.log(cDate);
          console.log(`${hijriMonth}/${hijriDay}`);
          console.log(`${month}/${day}`);
          if (cDate === `${hijriMonth}/${hijriDay}`) {
            flag = true;
          }
          // item.date.date.forEach((elem) => {
          //   if (elem === hijriMonth || elem === hijriDay) {
          //     console.log('hijri');
          //     flag = true;
          //   }
          // });
        }
      });
      // console.log(flag);

      // Highlight the 1st and 20th day of each month.
      return flag ? 'example-custom-date-class' : '';
    }

    return '';
  };

  ngOnInit() {
    console.log(HolidayEvents);
    console.log(HolidayEvents);
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
