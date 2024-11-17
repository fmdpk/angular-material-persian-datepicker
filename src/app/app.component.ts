import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {JALALI_MOMENT_FORMATS} from "./JALALI_MOMENT_FORMATS";
import {JalaliDateAdapter} from "./jalali-service";
import {MatMomentDateModule} from "@angular/material-moment-adapter";


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: JalaliDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'fa-IR' },
    { provide: MAT_DATE_FORMATS, useValue: JALALI_MOMENT_FORMATS },
  ],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule,MatMomentDateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Jalali-material-date-picker';
}
