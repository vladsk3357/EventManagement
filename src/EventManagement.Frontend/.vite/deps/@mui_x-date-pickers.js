import {
  ArrowDropDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ClearIcon,
  ClockIcon,
  DAY_MARGIN,
  DAY_SIZE,
  DEFAULT_DESKTOP_MODE_MEDIA_QUERY,
  DEFAULT_LOCALE,
  DateCalendar,
  DateField,
  DatePicker,
  DatePickerToolbar,
  DateRangeIcon,
  DateTimeField,
  DateTimePicker,
  DateTimePickerTabs,
  DateTimePickerToolbar,
  DesktopDatePicker,
  DesktopDateTimePicker,
  DesktopTimePicker,
  DigitalClock,
  LocalizationProvider,
  MobileDatePicker,
  MobileDateTimePicker,
  MobileTimePicker,
  MonthCalendar,
  MuiPickersAdapterContext,
  MultiSectionDigitalClock,
  PickersActionBar,
  PickersCalendarHeader,
  PickersDay,
  PickersLayout,
  PickersLayoutContentWrapper,
  PickersLayoutRoot,
  PickersShortcuts,
  TimeClock,
  TimeField,
  TimeIcon,
  TimePicker,
  TimePickerToolbar,
  YearCalendar,
  clockClasses,
  clockNumberClasses,
  clockPointerClasses,
  dateCalendarClasses,
  datePickerToolbarClasses,
  dateTimePickerTabsClasses,
  dateTimePickerToolbarClasses,
  dayPickerClasses,
  digitalClockClasses,
  enUS,
  getDateCalendarUtilityClass,
  getDigitalClockUtilityClass,
  getMonthCalendarUtilityClass,
  getMultiSectionDigitalClockUtilityClass,
  getPickersDayUtilityClass,
  getPickersLocalization,
  getTimeClockUtilityClass,
  getYearCalendarUtilityClass,
  monthCalendarClasses,
  multiSectionDigitalClockClasses,
  multiSectionDigitalClockSectionClasses,
  pickersCalendarHeaderClasses,
  pickersDayClasses,
  pickersFadeTransitionGroupClasses,
  pickersLayoutClasses,
  pickersMonthClasses,
  pickersSlideTransitionClasses,
  pickersYearClasses,
  renderDateViewCalendar,
  renderDigitalClockTimeView,
  renderMultiSectionDigitalClockTimeView,
  renderTimeViewClock,
  singleItemValueManager,
  timeClockClasses,
  timePickerToolbarClasses,
  useClearableField,
  useDateField,
  useDatePickerDefaultizedProps,
  useDateTimeField,
  useDateTimePickerDefaultizedProps,
  usePickerLayout_default,
  useStaticPicker,
  useTimeField,
  useTimePickerDefaultizedProps,
  validateDate,
  validateDateTime,
  validateTime,
  yearCalendarClasses
} from "./chunk-BANMOJLX.js";
import "./chunk-2Q5LCKB4.js";
import "./chunk-5YAJGFHZ.js";
import "./chunk-KZ7TNBG4.js";
import "./chunk-5VB3PMTU.js";
import "./chunk-G4EL7RMO.js";
import "./chunk-4XR7QHBO.js";
import "./chunk-WSFVVCM2.js";
import "./chunk-2AO2REQK.js";
import "./chunk-V4O2BYAR.js";
import "./chunk-BKVFOUNH.js";
import {
  Skeleton_default
} from "./chunk-6KJ5WMDR.js";
import "./chunk-3JUN2JQV.js";
import "./chunk-I3ZJTL7M.js";
import "./chunk-CWNGMIEL.js";
import "./chunk-QO4BDEDF.js";
import "./chunk-UFLBAJNH.js";
import "./chunk-4UY5YO5U.js";
import "./chunk-JD7ZOSPO.js";
import "./chunk-A4JSYAUA.js";
import "./chunk-I7HKBVYL.js";
import "./chunk-DDJFW5LL.js";
import "./chunk-KRZM5VIA.js";
import {
  styled_default,
  useThemeProps
} from "./chunk-B7RNAU2U.js";
import "./chunk-Z4IOREVE.js";
import {
  _objectWithoutPropertiesLoose,
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_clsx,
  init_esm,
  init_objectWithoutPropertiesLoose,
  require_jsx_runtime
} from "./chunk-KUPFN3OA.js";
import "./chunk-AK6QMITG.js";
import {
  require_prop_types
} from "./chunk-7Z7URJP5.js";
import {
  require_react
} from "./chunk-LNTNMRP6.js";
import {
  _extends,
  init_extends
} from "./chunk-LA4EM3QP.js";
import {
  __toESM
} from "./chunk-FWVXXLA5.js";

// node_modules/@mui/x-date-pickers/locales/beBY.js
var views = {
  // maps TimeView to its translation
  hours: "гадзіны",
  minutes: "хвіліны",
  seconds: "секунды",
  meridiem: "мерыдыем"
};
var beBYPickers = {
  // Calendar navigation
  previousMonth: "Папярэдні месяц",
  nextMonth: "Наступны месяц",
  // View navigation
  openPreviousView: "адкрыць папярэдні выгляд",
  openNextView: "адкрыць наступны выгляд",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "гадавы выгляд адкрыты, перайсці да каляндарнага выгляду" : "каляндарны выгляд адкрыты, перайсці да гадавога выгляду",
  // DateRange placeholders
  start: "Пачатак",
  end: "Канец",
  // Action bar
  cancelButtonLabel: "Адмена",
  clearButtonLabel: "Ачысціць",
  okButtonLabel: "OK",
  todayButtonLabel: "Сёння",
  // Toolbar titles
  datePickerToolbarTitle: "Абраць дату",
  dateTimePickerToolbarTitle: "Абраць дату і час",
  timePickerToolbarTitle: "Абраць час",
  dateRangePickerToolbarTitle: "Абраць каляндарны перыяд",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Абярыце ${views[view]}. ${time === null ? "Час не абраны" : `Абраны час ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} гадзін`,
  minutesClockNumberText: (minutes) => `${minutes} хвілін`,
  secondsClockNumberText: (seconds) => `${seconds} секунд`,
  // Digital clock labels
  selectViewText: (view) => `Абярыце ${views[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Нумар тыдня",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Тыдзень ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Абраць дату, абрана дата  ${utils.format(value, "fullDate")}` : "Абраць дату",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Абраць час, абрыны час  ${utils.format(value, "fullTime")}` : "Абраць час",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "абраць час",
  dateTableLabel: "абраць дату",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var beBY = getPickersLocalization(beBYPickers);

// node_modules/@mui/x-date-pickers/locales/caES.js
var views2 = {
  hours: "les hores",
  minutes: "els minuts",
  seconds: "els segons",
  meridiem: "meridiem"
};
var caESPickers = {
  // Calendar navigation
  previousMonth: "Últim mes",
  nextMonth: "Pròxim mes",
  // View navigation
  openPreviousView: "obrir l'última vista",
  openNextView: "obrir la següent vista",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "la vista de l'any està oberta, canvie a la vista de calendari" : "la vista de calendari està oberta, canvie a la vista de l'any",
  // DateRange placeholders
  start: "Començar",
  end: "Terminar",
  // Action bar
  cancelButtonLabel: "Cancel·lar",
  clearButtonLabel: "Netejar",
  okButtonLabel: "OK",
  todayButtonLabel: "Hui",
  // Toolbar titles
  datePickerToolbarTitle: "Seleccionar data",
  dateTimePickerToolbarTitle: "Seleccionar data i hora",
  timePickerToolbarTitle: "Seleccionar hora",
  dateRangePickerToolbarTitle: "Seleccionar rang de dates",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Seleccione ${views2[view]}. ${time === null ? "Sense temps seleccionat" : `El temps seleccionat és ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} hores`,
  minutesClockNumberText: (minutes) => `${minutes} minuts`,
  secondsClockNumberText: (seconds) => `${seconds} segons`,
  // Digital clock labels
  selectViewText: (view) => `Seleccionar ${views2[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Número de setmana",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Setmana ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Tria la data, la data triada és ${utils.format(value, "fullDate")}` : "Tria la data",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Tria l'hora, l'hora triada és ${utils.format(value, "fullTime")}` : "Tria l'hora",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "tria la data",
  dateTableLabel: "tria l'hora",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var caES = getPickersLocalization(caESPickers);

// node_modules/@mui/x-date-pickers/locales/csCZ.js
var timeViews = {
  hours: "Hodiny",
  minutes: "Minuty",
  seconds: "Sekundy",
  meridiem: "Odpoledne"
};
var csCZPickers = {
  // Calendar navigation
  previousMonth: "Předchozí měsíc",
  nextMonth: "Další měsíc",
  // View navigation
  openPreviousView: "otevřít předchozí zobrazení",
  openNextView: "otevřít další zobrazení",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "roční zobrazení otevřeno, přepněte do zobrazení kalendáře" : "zobrazení kalendáře otevřeno, přepněte do zobrazení roku",
  // DateRange placeholders
  start: "Začátek",
  end: "Konec",
  // Action bar
  cancelButtonLabel: "Zrušit",
  clearButtonLabel: "Vymazat",
  okButtonLabel: "Potvrdit",
  todayButtonLabel: "Dnes",
  // Toolbar titles
  datePickerToolbarTitle: "Vyberte datum",
  dateTimePickerToolbarTitle: "Vyberte datum a čas",
  timePickerToolbarTitle: "Vyberte čas",
  dateRangePickerToolbarTitle: "Vyberete rozmezí dat",
  // Clock labels
  clockLabelText: (view, time, adapter) => {
    var _timeViews$view;
    return `${(_timeViews$view = timeViews[view]) != null ? _timeViews$view : view} vybrány. ${time === null ? "Není vybrán čas" : `Vybraný čas je ${adapter.format(time, "fullTime")}`}`;
  },
  hoursClockNumberText: (hours) => `${hours} hodin`,
  minutesClockNumberText: (minutes) => `${minutes} minut`,
  secondsClockNumberText: (seconds) => `${seconds} sekund`,
  // Digital clock labels
  selectViewText: (view) => `Vyberte ${timeViews[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Týden v roce",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `${weekNumber} týden v roce`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Vyberte datum, vybrané datum je ${utils.format(value, "fullDate")}` : "Vyberte datum",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Vyberte čas, vybraný čas je ${utils.format(value, "fullTime")}` : "Vyberte čas",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "vyberte čas",
  dateTableLabel: "vyberte datum",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var csCZ = getPickersLocalization(csCZPickers);

// node_modules/@mui/x-date-pickers/locales/daDK.js
var timeViews2 = {
  hours: "Timer",
  minutes: "Minutter",
  seconds: "Sekunder",
  meridiem: "Meridiem"
};
var daDKPickers = {
  // Calendar navigation
  previousMonth: "Forrige måned",
  nextMonth: "Næste måned",
  // View navigation
  openPreviousView: "åben forrige visning",
  openNextView: "åben næste visning",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "årsvisning er åben, skift til kalendervisning" : "kalendervisning er åben, skift til årsvisning",
  // DateRange placeholders
  start: "Start",
  end: "Slut",
  // Action bar
  cancelButtonLabel: "Annuller",
  clearButtonLabel: "Ryd",
  okButtonLabel: "OK",
  todayButtonLabel: "I dag",
  // Toolbar titles
  datePickerToolbarTitle: "Vælg dato",
  dateTimePickerToolbarTitle: "Vælg dato & tidspunkt",
  timePickerToolbarTitle: "Vælg tidspunkt",
  dateRangePickerToolbarTitle: "Vælg datointerval",
  // Clock labels
  clockLabelText: (view, time, adapter) => {
    var _timeViews$view;
    return `Vælg ${(_timeViews$view = timeViews2[view]) != null ? _timeViews$view : view}. ${time === null ? "Intet tidspunkt valgt" : `Valgte tidspunkt er ${adapter.format(time, "fullTime")}`}`;
  },
  hoursClockNumberText: (hours) => `${hours} timer`,
  minutesClockNumberText: (minutes) => `${minutes} minutter`,
  secondsClockNumberText: (seconds) => `${seconds} sekunder`,
  // Digital clock labels
  selectViewText: (view) => `Vælg ${timeViews2[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Ugenummer",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Uge ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Vælg dato, valgte dato er ${utils.format(value, "fullDate")}` : "Vælg dato",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Vælg tidspunkt, valgte tidspunkt er ${utils.format(value, "fullTime")}` : "Vælg tidspunkt",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "vælg tidspunkt",
  dateTableLabel: "vælg dato",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var daDK = getPickersLocalization(daDKPickers);

// node_modules/@mui/x-date-pickers/locales/deDE.js
var timeViews3 = {
  hours: "Stunden",
  minutes: "Minuten",
  seconds: "Sekunden",
  meridiem: "Meridiem"
};
var deDEPickers = {
  // Calendar navigation
  previousMonth: "Letzter Monat",
  nextMonth: "Nächster Monat",
  // View navigation
  openPreviousView: "Letzte Ansicht öffnen",
  openNextView: "Nächste Ansicht öffnen",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "Jahresansicht ist geöffnet, zur Kalenderansicht wechseln" : "Kalenderansicht ist geöffnet, zur Jahresansicht wechseln",
  // DateRange placeholders
  start: "Beginn",
  end: "Ende",
  // Action bar
  cancelButtonLabel: "Abbrechen",
  clearButtonLabel: "Löschen",
  okButtonLabel: "OK",
  todayButtonLabel: "Heute",
  // Toolbar titles
  datePickerToolbarTitle: "Datum auswählen",
  dateTimePickerToolbarTitle: "Datum & Uhrzeit auswählen",
  timePickerToolbarTitle: "Uhrzeit auswählen",
  dateRangePickerToolbarTitle: "Datumsbereich auswählen",
  // Clock labels
  clockLabelText: (view, time, adapter) => {
    var _timeViews$view;
    return `${(_timeViews$view = timeViews3[view]) != null ? _timeViews$view : view} auswählen. ${time === null ? "Keine Uhrzeit ausgewählt" : `Gewählte Uhrzeit ist ${adapter.format(time, "fullTime")}`}`;
  },
  hoursClockNumberText: (hours) => `${hours} ${timeViews3.hours}`,
  minutesClockNumberText: (minutes) => `${minutes} ${timeViews3.minutes}`,
  secondsClockNumberText: (seconds) => `${seconds}  ${timeViews3.seconds}`,
  // Digital clock labels
  selectViewText: (view) => `${timeViews3[view]} auswählen`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Kalenderwoche",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Woche ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Datum auswählen, gewähltes Datum ist ${utils.format(value, "fullDate")}` : "Datum auswählen",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Uhrzeit auswählen, gewählte Uhrzeit ist ${utils.format(value, "fullTime")}` : "Uhrzeit auswählen",
  fieldClearLabel: "Wert leeren",
  // Table labels
  timeTableLabel: "Uhrzeit auswählen",
  dateTableLabel: "Datum auswählen",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "J".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "TT",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var deDE = getPickersLocalization(deDEPickers);

// node_modules/@mui/x-date-pickers/locales/elGR.js
var views3 = {
  hours: "ώρες",
  minutes: "λεπτά",
  seconds: "δευτερόλεπτα",
  meridiem: "μεσημβρία"
};
var elGRPickers = {
  // Calendar navigation
  previousMonth: "Προηγούμενος μήνας",
  nextMonth: "Επόμενος μήνας",
  // View navigation
  openPreviousView: "ανοίγμα προηγούμενης προβολή",
  openNextView: "ανοίγμα επόμενης προβολή",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "η προβολή έτους είναι ανοιχτή, μεταβείτε στην προβολή ημερολογίου" : "η προβολή ημερολογίου είναι ανοιχτή, μεταβείτε στην προβολή έτους",
  // DateRange placeholders
  start: "Αρχή",
  end: "Τέλος",
  // Action bar
  cancelButtonLabel: "Άκυρο",
  clearButtonLabel: "Καθαρισμός",
  okButtonLabel: "OK",
  todayButtonLabel: "Σήμερα",
  // Toolbar titles
  datePickerToolbarTitle: "Επιλέξτε ημερομηνία",
  dateTimePickerToolbarTitle: "Επιλέξτε ημερομηνία και ώρα",
  timePickerToolbarTitle: "Επιλέξτε ώρα",
  dateRangePickerToolbarTitle: "Επιλέξτε εύρος ημερομηνιών",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Επιλέξτε ${views3[view]}. ${time === null ? "Δεν έχει επιλεγεί ώρα" : `Η επιλεγμένη ώρα είναι ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} ώρες`,
  minutesClockNumberText: (minutes) => `${minutes} λεπτά`,
  secondsClockNumberText: (seconds) => `${seconds} δευτερόλεπτα`,
  // Digital clock labels
  selectViewText: (view) => `Επιλέξτε ${views3[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Αριθμός εβδομάδας",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Εβδομάδα ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Επιλέξτε ημερομηνία, η επιλεγμένη ημερομηνία είναι ${utils.format(value, "fullDate")}` : "Επιλέξτε ημερομηνία",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Επιλέξτε ώρα, η επιλεγμένη ώρα είναι ${utils.format(value, "fullTime")}` : "Επιλέξτε ώρα",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "επιλέξτε ώρα",
  dateTableLabel: "επιλέξτε ημερομηνία",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var elGR = getPickersLocalization(elGRPickers);

// node_modules/@mui/x-date-pickers/locales/esES.js
var views4 = {
  hours: "las horas",
  minutes: "los minutos",
  seconds: "los segundos",
  meridiem: "meridiano"
};
var esESPickers = {
  // Calendar navigation
  previousMonth: "Último mes",
  nextMonth: "Próximo mes",
  // View navigation
  openPreviousView: "abrir la última vista",
  openNextView: "abrir la siguiente vista",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "la vista del año está abierta, cambie a la vista de calendario" : "la vista de calendario está abierta, cambie a la vista del año",
  // DateRange placeholders
  start: "Empezar",
  end: "Terminar",
  // Action bar
  cancelButtonLabel: "Cancelar",
  clearButtonLabel: "Limpiar",
  okButtonLabel: "OK",
  todayButtonLabel: "Hoy",
  // Toolbar titles
  datePickerToolbarTitle: "Seleccionar fecha",
  dateTimePickerToolbarTitle: "Seleccionar fecha y hora",
  timePickerToolbarTitle: "Seleccionar hora",
  dateRangePickerToolbarTitle: "Seleccionar rango de fecha",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Seleccione ${views4[view]}. ${time === null ? "No hay hora seleccionada" : `La hora seleccionada es ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} horas`,
  minutesClockNumberText: (minutes) => `${minutes} minutos`,
  secondsClockNumberText: (seconds) => `${seconds} segundos`,
  // Digital clock labels
  selectViewText: (view) => `Seleccionar ${views4[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Número de semana",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Semana ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Elige fecha, la fecha elegida es ${utils.format(value, "fullDate")}` : "Elige fecha",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Elige hora, la hora elegida es ${utils.format(value, "fullTime")}` : "Elige hora",
  fieldClearLabel: "Limpiar valor",
  // Table labels
  timeTableLabel: "elige hora",
  dateTableLabel: "elige fecha",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "A".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var esES = getPickersLocalization(esESPickers);

// node_modules/@mui/x-date-pickers/locales/eu.js
var views5 = {
  hours: "orduak",
  minutes: "minutuak",
  seconds: "segunduak",
  meridiem: "meridianoa"
};
var euPickers = {
  // Calendar navigation
  previousMonth: "Azken hilabetea",
  nextMonth: "Hurrengo hilabetea",
  // View navigation
  openPreviousView: "azken bista ireki",
  openNextView: "hurrengo bista ireki",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "urteko bista irekita dago, aldatu egutegi bistara" : "egutegi bista irekita dago, aldatu urteko bistara",
  // DateRange placeholders
  start: "Hasi",
  end: "Bukatu",
  // Action bar
  cancelButtonLabel: "Utxi",
  clearButtonLabel: "Garbitu",
  okButtonLabel: "OK",
  todayButtonLabel: "Gaur",
  // Toolbar titles
  datePickerToolbarTitle: "Data aukeratu",
  dateTimePickerToolbarTitle: "Data eta ordua aukeratu",
  timePickerToolbarTitle: "Ordua aukeratu",
  dateRangePickerToolbarTitle: "Data tartea aukeratu",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Aukeratu ${views5[view]}. ${time === null ? "Ez da ordurik aukertau" : `Aukeratutako ordua ${adapter.format(time, "fullTime")} da`}`,
  hoursClockNumberText: (hours) => `${hours} ordu`,
  minutesClockNumberText: (minutes) => `${minutes} minutu`,
  secondsClockNumberText: (seconds) => `${seconds} segundu`,
  // Digital clock labels
  selectViewText: (view) => `Aukeratu ${views5[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Astea zenbakia",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `${weekNumber} astea`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Data aukeratu, aukeratutako data ${utils.format(value, "fullDate")} da` : "Data aukeratu",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Ordua aukeratu, aukeratutako ordua ${utils.format(value, "fullTime")} da` : "Ordua aukeratu",
  fieldClearLabel: "Balioa garbitu",
  // Table labels
  timeTableLabel: "ordua aukeratu",
  dateTableLabel: "data aukeratu",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var eu = getPickersLocalization(euPickers);

// node_modules/@mui/x-date-pickers/locales/faIR.js
var timeViews4 = {
  hours: "ساعت ها",
  minutes: "دقیقه ها",
  seconds: "ثانیه ها",
  meridiem: "بعد از ظهر"
};
var faIRPickers = {
  // Calendar navigation
  previousMonth: "ماه گذشته",
  nextMonth: "ماه آینده",
  // View navigation
  openPreviousView: "نمای قبلی",
  openNextView: "نمای بعدی",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "نمای سال باز است، رفتن به نمای تقویم" : "نمای تقویم باز است، رفتن به نمای سال",
  // DateRange placeholders
  start: "شروع",
  end: "پایان",
  // Action bar
  cancelButtonLabel: "لغو",
  clearButtonLabel: "پاک کردن",
  okButtonLabel: "اوکی",
  todayButtonLabel: "امروز",
  // Toolbar titles
  datePickerToolbarTitle: "تاریخ را انتخاب کنید",
  dateTimePickerToolbarTitle: "تاریخ و ساعت را انتخاب کنید",
  timePickerToolbarTitle: "ساعت را انتخاب کنید",
  dateRangePickerToolbarTitle: "محدوده تاریخ را انتخاب کنید",
  // Clock labels
  clockLabelText: (view, time, adapter) => ` را انتخاب کنید ${timeViews4[view]}. ${time === null ? "هیچ ساعتی انتخاب نشده است" : `ساعت انتخاب ${adapter.format(time, "fullTime")} می باشد`}`,
  hoursClockNumberText: (hours) => `${hours} ساعت ها`,
  minutesClockNumberText: (minutes) => `${minutes} دقیقه ها`,
  secondsClockNumberText: (seconds) => `${seconds} ثانیه ها`,
  // Digital clock labels
  selectViewText: (view) => ` را انتخاب کنید ${timeViews4[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "عدد هفته",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `هفته ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `تاریخ را انتخاب کنید، تاریخ انتخاب شده ${utils.format(value, "fullDate")} می باشد` : "تاریخ را انتخاب کنید",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `ساعت را انتخاب کنید، ساعت انتخاب شده ${utils.format(value, "fullTime")} می باشد` : "ساعت را انتخاب کنید",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "انتخاب تاریخ",
  dateTableLabel: "انتخاب ساعت",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var faIR = getPickersLocalization(faIRPickers);

// node_modules/@mui/x-date-pickers/locales/fiFI.js
var views6 = {
  hours: "tunnit",
  minutes: "minuutit",
  seconds: "sekuntit",
  meridiem: "iltapäivä"
};
var fiFIPickers = {
  // Calendar navigation
  previousMonth: "Edellinen kuukausi",
  nextMonth: "Seuraava kuukausi",
  // View navigation
  openPreviousView: "avaa edellinen kuukausi",
  openNextView: "avaa seuraava kuukausi",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "vuosinäkymä on auki, vaihda kalenterinäkymään" : "kalenterinäkymä on auki, vaihda vuosinäkymään",
  // DateRange placeholders
  start: "Alku",
  end: "Loppu",
  // Action bar
  cancelButtonLabel: "Peruuta",
  clearButtonLabel: "Tyhjennä",
  okButtonLabel: "OK",
  todayButtonLabel: "Tänään",
  // Toolbar titles
  datePickerToolbarTitle: "Valitse päivä",
  dateTimePickerToolbarTitle: "Valitse päivä ja aika",
  timePickerToolbarTitle: "Valitse aika",
  dateRangePickerToolbarTitle: "Valitse aikaväli",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Valitse ${views6[view]}. ${time === null ? "Ei aikaa valittuna" : `Valittu aika on ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} tuntia`,
  minutesClockNumberText: (minutes) => `${minutes} minuuttia`,
  secondsClockNumberText: (seconds) => `${seconds} sekunttia`,
  // Digital clock labels
  selectViewText: (view) => `Valitse ${views6[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Viikko",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Viikko ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Valitse päivä, valittu päivä on ${utils.format(value, "fullDate")}` : "Valitse päivä",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Valitse aika, valittu aika on ${utils.format(value, "fullTime")}` : "Valitse aika",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "valitse aika",
  dateTableLabel: "valitse päivä",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "V".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "KKKK" : "KK",
  fieldDayPlaceholder: () => "PP",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "tt",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var fiFI = getPickersLocalization(fiFIPickers);

// node_modules/@mui/x-date-pickers/locales/frFR.js
var views7 = {
  hours: "heures",
  minutes: "minutes",
  seconds: "secondes",
  meridiem: "méridien"
};
var frFRPickers = {
  // Calendar navigation
  previousMonth: "Mois précédent",
  nextMonth: "Mois suivant",
  // View navigation
  openPreviousView: "Ouvrir la vue précédente",
  openNextView: "Ouvrir la vue suivante",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "La vue année est ouverte, ouvrir la vue calendrier" : "La vue calendrier est ouverte, ouvrir la vue année",
  // DateRange placeholders
  start: "Début",
  end: "Fin",
  // Action bar
  cancelButtonLabel: "Annuler",
  clearButtonLabel: "Vider",
  okButtonLabel: "OK",
  todayButtonLabel: "Aujourd'hui",
  // Toolbar titles
  datePickerToolbarTitle: "Choisir une date",
  dateTimePickerToolbarTitle: "Choisir la date et l'heure",
  timePickerToolbarTitle: "Choisir l'heure",
  dateRangePickerToolbarTitle: "Choisir la plage de dates",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Choix des ${views7[view]}. ${time === null ? "Aucune heure choisie" : `L'heure choisie est ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} heures`,
  minutesClockNumberText: (minutes) => `${minutes} minutes`,
  secondsClockNumberText: (seconds) => `${seconds} secondes`,
  // Digital clock labels
  selectViewText: (view) => `Choisir ${views7[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Semaine",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Semaine ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Choisir la date, la date sélectionnée est ${utils.format(value, "fullDate")}` : "Choisir la date",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Choisir l'heure, l'heure sélectionnée est ${utils.format(value, "fullTime")}` : "Choisir l'heure",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "choix de l'heure",
  dateTableLabel: "choix de la date",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "A".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "JJ",
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var frFR = getPickersLocalization(frFRPickers);

// node_modules/@mui/x-date-pickers/locales/heIL.js
var views8 = {
  hours: "שעות",
  minutes: "דקות",
  seconds: "שניות",
  meridiem: "מרידיאם"
};
var heILPickers = {
  // Calendar navigation
  previousMonth: "חודש קודם",
  nextMonth: "חודש הבא",
  // View navigation
  openPreviousView: "תצוגה קודמת",
  openNextView: "תצוגה הבאה",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "תצוגת שנה פתוחה, מעבר לתצוגת לוח שנה" : "תצוגת לוח שנה פתוחה, מעבר לתצוגת שנה",
  // DateRange placeholders
  start: "תחילה",
  end: "סיום",
  // Action bar
  cancelButtonLabel: "ביטול",
  clearButtonLabel: "ניקוי",
  okButtonLabel: "אישור",
  todayButtonLabel: "היום",
  // Toolbar titles
  datePickerToolbarTitle: "בחירת תאריך",
  dateTimePickerToolbarTitle: "בחירת תאריך ושעה",
  timePickerToolbarTitle: "בחירת שעה",
  dateRangePickerToolbarTitle: "בחירת טווח תאריכים",
  // Clock labels
  clockLabelText: (view, time, adapter) => `בחירת ${views8[view]}. ${time === null ? "לא נבחרה שעה" : `השעה הנבחרת היא ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} שעות`,
  minutesClockNumberText: (minutes) => `${minutes} דקות`,
  secondsClockNumberText: (seconds) => `${seconds} שניות`,
  // Digital clock labels
  selectViewText: (view) => `בחירת ${views8[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "שבוע מספר",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `שבוע ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `בחירת תאריך, התאריך שנבחר הוא ${utils.format(value, "fullDate")}` : "בחירת תאריך",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `בחירת שעה, השעה שנבחרה היא ${utils.format(value, "fullTime")}` : "בחירת שעה",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "בחירת שעה",
  dateTableLabel: "בחירת תאריך",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var heIL = getPickersLocalization(heILPickers);

// node_modules/@mui/x-date-pickers/locales/huHU.js
var timeViews5 = {
  hours: "Óra",
  minutes: "Perc",
  seconds: "Másodperc",
  meridiem: "Délután"
};
var huHUPickers = {
  // Calendar navigation
  previousMonth: "Előző hónap",
  nextMonth: "Következő hónap",
  // View navigation
  openPreviousView: "Előző nézet megnyitása",
  openNextView: "Következő nézet megnyitása",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "az évválasztó már nyitva, váltson a naptárnézetre" : "a naptárnézet már nyitva, váltson az évválasztóra",
  // DateRange placeholders
  start: "Kezdő dátum",
  end: "Záró dátum",
  // Action bar
  cancelButtonLabel: "Mégse",
  clearButtonLabel: "Törlés",
  okButtonLabel: "OK",
  todayButtonLabel: "Ma",
  // Toolbar titles
  datePickerToolbarTitle: "Dátum kiválasztása",
  dateTimePickerToolbarTitle: "Dátum és idő kiválasztása",
  timePickerToolbarTitle: "Idő kiválasztása",
  dateRangePickerToolbarTitle: "Dátumhatárok kiválasztása",
  // Clock labels
  clockLabelText: (view, time, adapter) => {
    var _timeViews$view;
    return `${(_timeViews$view = timeViews5[view]) != null ? _timeViews$view : view} kiválasztása. ${time === null ? "Nincs kiválasztva idő" : `A kiválasztott idő ${adapter.format(time, "fullTime")}`}`;
  },
  hoursClockNumberText: (hours) => `${hours} ${timeViews5.hours.toLowerCase()}`,
  minutesClockNumberText: (minutes) => `${minutes} ${timeViews5.minutes.toLowerCase()}`,
  secondsClockNumberText: (seconds) => `${seconds}  ${timeViews5.seconds.toLowerCase()}`,
  // Digital clock labels
  selectViewText: (view) => `${timeViews5[view]} kiválasztása`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Hét",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `${weekNumber}. hét`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Válasszon dátumot, a kiválasztott dátum: ${utils.format(value, "fullDate")}` : "Válasszon dátumot",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Válasszon időt, a kiválasztott idő: ${utils.format(value, "fullTime")}` : "Válasszon időt",
  fieldClearLabel: "Tartalom ürítése",
  // Table labels
  timeTableLabel: "válasszon időt",
  dateTableLabel: "válasszon dátumot",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "É".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "HHHH" : "HH",
  fieldDayPlaceholder: () => "NN",
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => "óó",
  fieldMinutesPlaceholder: () => "pp",
  fieldSecondsPlaceholder: () => "mm",
  fieldMeridiemPlaceholder: () => "dd"
};
var huHU = getPickersLocalization(huHUPickers);

// node_modules/@mui/x-date-pickers/locales/isIS.js
var timeViews6 = {
  hours: "klukkustundir",
  minutes: "mínútur",
  seconds: "sekúndur",
  meridiem: "eftirmiðdagur"
};
var isISPickers = {
  // Calendar navigation
  previousMonth: "Fyrri mánuður",
  nextMonth: "Næsti mánuður",
  // View navigation
  openPreviousView: "opna fyrri skoðun",
  openNextView: "opna næstu skoðun",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "ársskoðun er opin, skipta yfir í dagatalsskoðun" : "dagatalsskoðun er opin, skipta yfir í ársskoðun",
  // DateRange placeholders
  start: "Upphaf",
  end: "Endir",
  // Action bar
  cancelButtonLabel: "Hætta við",
  clearButtonLabel: "Hreinsa",
  okButtonLabel: "OK",
  todayButtonLabel: "Í dag",
  // Toolbar titles
  datePickerToolbarTitle: "Velja dagsetningu",
  dateTimePickerToolbarTitle: "Velja dagsetningu og tíma",
  timePickerToolbarTitle: "Velja tíma",
  dateRangePickerToolbarTitle: "Velja tímabil",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Velja ${timeViews6[view]}. ${time === null ? "Enginn tími valinn" : `Valinn tími er ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} klukkustundir`,
  minutesClockNumberText: (minutes) => `${minutes} mínútur`,
  secondsClockNumberText: (seconds) => `${seconds} sekúndur`,
  // Digital clock labels
  selectViewText: (view) => `Velja ${timeViews6[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Vikunúmer",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Vika ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Velja dagsetningu, valin dagsetning er ${utils.format(value, "fullDate")}` : "Velja dagsetningu",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Velja tíma, valinn tími er ${utils.format(value, "fullTime")}` : "Velja tíma",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "velja tíma",
  dateTableLabel: "velja dagsetningu",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Á".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "kk",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "ee"
};
var isIS = getPickersLocalization(isISPickers);

// node_modules/@mui/x-date-pickers/locales/itIT.js
var views9 = {
  hours: "le ore",
  minutes: "i minuti",
  seconds: "i secondi",
  meridiem: "il meridiano"
};
var itITPickers = {
  // Calendar navigation
  previousMonth: "Mese precedente",
  nextMonth: "Mese successivo",
  // View navigation
  openPreviousView: "apri la vista precedente",
  openNextView: "apri la vista successiva",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "la vista dell'anno è aperta, passare alla vista del calendario" : "la vista dell'calendario è aperta, passare alla vista dell'anno",
  // DateRange placeholders
  start: "Inizio",
  end: "Fine",
  // Action bar
  cancelButtonLabel: "Cancellare",
  clearButtonLabel: "Sgomberare",
  okButtonLabel: "OK",
  todayButtonLabel: "Oggi",
  // Toolbar titles
  datePickerToolbarTitle: "Seleziona data",
  dateTimePickerToolbarTitle: "Seleziona data e orario",
  timePickerToolbarTitle: "Seleziona orario",
  dateRangePickerToolbarTitle: "Seleziona intervallo di date",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Seleziona ${views9[view]}. ${time === null ? "Nessun orario selezionato" : `L'ora selezionata è ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} ore`,
  minutesClockNumberText: (minutes) => `${minutes} minuti`,
  secondsClockNumberText: (seconds) => `${seconds} secondi`,
  // Digital clock labels
  selectViewText: (view) => `Seleziona ${views9[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Numero settimana",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Settimana ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Scegli la data, la data selezionata è ${utils.format(value, "fullDate")}` : "Scegli la data",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Scegli l'ora, l'ora selezionata è ${utils.format(value, "fullTime")}` : "Scegli l'ora",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "scegli un'ora",
  dateTableLabel: "scegli una data",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "A".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "GG",
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var itIT = getPickersLocalization(itITPickers);

// node_modules/@mui/x-date-pickers/locales/jaJP.js
var timeViews7 = {
  hours: "時間",
  minutes: "分",
  seconds: "秒",
  meridiem: "メリディム"
};
var jaJPPickers = {
  // Calendar navigation
  previousMonth: "先月",
  nextMonth: "来月",
  // View navigation
  openPreviousView: "前の表示を開く",
  openNextView: "次の表示を開く",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "年選択表示からカレンダー表示に切り替える" : "カレンダー表示から年選択表示に切り替える",
  // DateRange placeholders
  start: "開始",
  end: "終了",
  // Action bar
  cancelButtonLabel: "キャンセル",
  clearButtonLabel: "クリア",
  okButtonLabel: "確定",
  todayButtonLabel: "今日",
  // Toolbar titles
  datePickerToolbarTitle: "日付を選択",
  dateTimePickerToolbarTitle: "日時を選択",
  timePickerToolbarTitle: "時間を選択",
  dateRangePickerToolbarTitle: "日付の範囲を選択",
  // Clock labels
  clockLabelText: (view, time, adapter) => {
    var _timeViews$view;
    return `${(_timeViews$view = timeViews7[view]) != null ? _timeViews$view : view}を選択してください ${time === null ? "時間が選択されていません" : `選択した時間は ${adapter.format(time, "fullTime")} です`}`;
  },
  hoursClockNumberText: (hours) => `${hours} ${timeViews7.hours}`,
  minutesClockNumberText: (minutes) => `${minutes} ${timeViews7.minutes}`,
  secondsClockNumberText: (seconds) => `${seconds} ${timeViews7.seconds}`,
  // Digital clock labels
  selectViewText: (view) => `を選択 ${timeViews7[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "週番号",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `${weekNumber}週目`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `日付を選択してください。選択した日付は ${utils.format(value, "fullDate")} です` : "日付を選択してください",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `時間を選択してください。選択した時間は ${utils.format(value, "fullTime")} です` : "時間を選択してください",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "時間を選択",
  dateTableLabel: "日付を選択",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var jaJP = getPickersLocalization(jaJPPickers);

// node_modules/@mui/x-date-pickers/locales/koKR.js
var views10 = {
  hours: "시간을",
  minutes: "분을",
  seconds: "초를",
  meridiem: "메리디엠"
};
var koKRPickers = {
  // Calendar navigation
  previousMonth: "이전 달",
  nextMonth: "다음 달",
  // View navigation
  openPreviousView: "이전 화면 보기",
  openNextView: "다음 화면 보기",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "연도 선택 화면에서 달력 화면으로 전환하기" : "달력 화면에서 연도 선택 화면으로 전환하기",
  // DateRange placeholders
  start: "시작",
  end: "종료",
  // Action bar
  cancelButtonLabel: "취소",
  clearButtonLabel: "초기화",
  okButtonLabel: "확인",
  todayButtonLabel: "오늘",
  // Toolbar titles
  datePickerToolbarTitle: "날짜 선택하기",
  dateTimePickerToolbarTitle: "날짜 & 시간 선택하기",
  timePickerToolbarTitle: "시간 선택하기",
  dateRangePickerToolbarTitle: "날짜 범위 선택하기",
  // Clock labels
  clockLabelText: (view, time, adapter) => `${views10[view]} 선택하세요. ${time === null ? "시간을 선택하지 않았습니다." : `현재 선택된 시간은 ${adapter.format(time, "fullTime")}입니다.`}`,
  hoursClockNumberText: (hours) => `${hours}시간`,
  minutesClockNumberText: (minutes) => `${minutes}분`,
  secondsClockNumberText: (seconds) => `${seconds}초`,
  // Digital clock labels
  selectViewText: (view) => `${views10[view]} 선택하기`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "주 번호",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `${weekNumber}번째 주`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `날짜를 선택하세요. 현재 선택된 날짜는 ${utils.format(value, "fullDate")}입니다.` : "날짜를 선택하세요",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `시간을 선택하세요. 현재 선택된 시간은 ${utils.format(value, "fullTime")}입니다.` : "시간을 선택하세요",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "선택한 시간",
  dateTableLabel: "선택한 날짜",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var koKR = getPickersLocalization(koKRPickers);

// node_modules/@mui/x-date-pickers/locales/kzKZ.js
var timeViews8 = {
  hours: "Сағатты",
  minutes: "Минутты",
  seconds: "Секундты",
  meridiem: "Меридием"
};
var kzKZPickers = {
  // Calendar navigation
  previousMonth: "Алдыңғы ай",
  nextMonth: "Келесі ай",
  // View navigation
  openPreviousView: "Алдыңғы көріністі ашу",
  openNextView: "Келесі көріністі ашу",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "жылдық көріністі ашу, күнтізбе көрінісіне ауысу" : "күнтізбе көрінісін ашу, жылдық көрінісіне ауысу",
  // DateRange placeholders
  start: "Бастау",
  end: "Cоңы",
  // Action bar
  cancelButtonLabel: "Бас тарту",
  clearButtonLabel: "Тазарту",
  okButtonLabel: "Ок",
  todayButtonLabel: "Бүгін",
  // Toolbar titles
  datePickerToolbarTitle: "Күнді таңдау",
  dateTimePickerToolbarTitle: "Күн мен уақытты таңдау",
  timePickerToolbarTitle: "Уақытты таңдау",
  dateRangePickerToolbarTitle: "Кезеңді таңдаңыз",
  // Clock labels
  clockLabelText: (view, time, adapter) => `${timeViews8[view]} таңдау. ${time === null ? "Уақыт таңдалмаған" : `Таңдалған уақыт ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} сағат`,
  minutesClockNumberText: (minutes) => `${minutes} минут`,
  secondsClockNumberText: (seconds) => `${seconds} секунд`,
  // Digital clock labels
  selectViewText: (view) => `${timeViews8[view]} таңдау`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Апта нөмірі",
  calendarWeekNumberHeaderText: "№",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Апта ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Күнді таңдаңыз, таңдалған күн ${utils.format(value, "fullDate")}` : "Күнді таңдаңыз",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Уақытты таңдаңыз, таңдалған уақыт ${utils.format(value, "fullTime")}` : "Уақытты таңдаңыз",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "уақытты таңдау",
  dateTableLabel: "күнді таңдау",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Ж".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "AAAA" : "AA",
  fieldDayPlaceholder: () => "КК",
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => "сс",
  fieldMinutesPlaceholder: () => "мм",
  fieldSecondsPlaceholder: () => "сс",
  fieldMeridiemPlaceholder: () => "(т|к)"
};
var kzKZ = getPickersLocalization(kzKZPickers);

// node_modules/@mui/x-date-pickers/locales/mk.js
var mkPickers = {
  // Calendar navigation
  previousMonth: "Предходен месец",
  nextMonth: "Следен месец",
  // View navigation
  openPreviousView: "отвори претходен приказ",
  openNextView: "отвори следен приказ",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "годишен приказ, отвори календарски приказ" : "календарски приказ, отвори годишен приказ",
  // DateRange placeholders
  start: "Почеток",
  end: "Крај",
  // Action bar
  cancelButtonLabel: "Откажи",
  clearButtonLabel: "Избриши",
  okButtonLabel: "OK",
  todayButtonLabel: "Денес",
  // Toolbar titles
  datePickerToolbarTitle: "Избери датум",
  dateTimePickerToolbarTitle: "Избери датум и време",
  timePickerToolbarTitle: "Избери време",
  dateRangePickerToolbarTitle: "Избери временски опсег",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Select ${view}. ${time === null ? "Нема избрано време" : `Избраното време е ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} часа`,
  minutesClockNumberText: (minutes) => `${minutes} минути`,
  secondsClockNumberText: (seconds) => `${seconds} секунди`,
  // Digital clock labels
  selectViewText: (view) => `Избери ${view}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Недела број",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Недела ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Избери датум, избраниот датум е ${utils.format(value, "fullDate")}` : "Избери датум",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Избери време, избраното време е ${utils.format(value, "fullTime")}` : "Избери време",
  fieldClearLabel: "Избриши",
  // Table labels
  timeTableLabel: "одбери време",
  dateTableLabel: "одбери датум",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Г".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "ДД",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "чч",
  fieldMinutesPlaceholder: () => "мм",
  fieldSecondsPlaceholder: () => "сс",
  fieldMeridiemPlaceholder: () => "aa"
};
var mk = getPickersLocalization(mkPickers);

// node_modules/@mui/x-date-pickers/locales/nbNO.js
var timeViews9 = {
  hours: "timer",
  minutes: "minutter",
  seconds: "sekunder",
  meridiem: "meridiem"
};
var nbNOPickers = {
  // Calendar navigation
  previousMonth: "Forrige måned",
  nextMonth: "Neste måned",
  // View navigation
  openPreviousView: "åpne forrige visning",
  openNextView: "åpne neste visning",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "årsvisning er åpen, bytt til kalendervisning" : "kalendervisning er åpen, bytt til årsvisning",
  // DateRange placeholders
  start: "Start",
  end: "Slutt",
  // Action bar
  cancelButtonLabel: "Avbryt",
  clearButtonLabel: "Fjern",
  okButtonLabel: "OK",
  todayButtonLabel: "I dag",
  // Toolbar titles
  datePickerToolbarTitle: "Velg dato",
  dateTimePickerToolbarTitle: "Velg dato & klokkeslett",
  timePickerToolbarTitle: "Velg klokkeslett",
  dateRangePickerToolbarTitle: "Velg datoperiode",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Velg ${timeViews9[view]}. ${time === null ? "Ingen tid valgt" : `Valgt tid er ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} timer`,
  minutesClockNumberText: (minutes) => `${minutes} minutter`,
  secondsClockNumberText: (seconds) => `${seconds} sekunder`,
  // Digital clock labels
  selectViewText: (view) => `Velg ${timeViews9[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Ukenummer",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Uke ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Velg dato, valgt dato er ${utils.format(value, "fullDate")}` : "Velg dato",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Velg tid, valgt tid er ${utils.format(value, "fullTime")}` : "Velg tid",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "velg tid",
  dateTableLabel: "velg dato",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Å".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "tt",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var nbNO = getPickersLocalization(nbNOPickers);

// node_modules/@mui/x-date-pickers/locales/nlNL.js
var timeViews10 = {
  hours: "uren",
  minutes: "minuten",
  seconds: "seconden",
  meridiem: "meridium"
};
var nlNLPickers = {
  // Calendar navigation
  previousMonth: "Vorige maand",
  nextMonth: "Volgende maand",
  // View navigation
  openPreviousView: "open vorige view",
  openNextView: "open volgende view",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "jaarweergave is geopend, schakel over naar kalenderweergave" : "kalenderweergave is geopend, switch naar jaarweergave",
  // DateRange placeholders
  start: "Start",
  end: "Einde",
  // Action bar
  cancelButtonLabel: "Annuleren",
  clearButtonLabel: "Resetten",
  okButtonLabel: "OK",
  todayButtonLabel: "Vandaag",
  // Toolbar titles
  datePickerToolbarTitle: "Selecteer datum",
  dateTimePickerToolbarTitle: "Selecteer datum & tijd",
  timePickerToolbarTitle: "Selecteer tijd",
  dateRangePickerToolbarTitle: "Selecteer datumbereik",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Selecteer ${timeViews10[view]}. ${time === null ? "Geen tijd geselecteerd" : `Geselecteerde tijd is ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} uren`,
  minutesClockNumberText: (minutes) => `${minutes} minuten`,
  secondsClockNumberText: (seconds) => `${seconds} seconden`,
  // Digital clock labels
  selectViewText: (view) => `Selecteer ${timeViews10[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Weeknummer",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Week ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Kies datum, geselecteerde datum is ${utils.format(value, "fullDate")}` : "Kies datum",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Kies tijd, geselecteerde tijd is ${utils.format(value, "fullTime")}` : "Kies tijd",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "kies tijd",
  dateTableLabel: "kies datum",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var nlNL = getPickersLocalization(nlNLPickers);

// node_modules/@mui/x-date-pickers/locales/plPL.js
var timeViews11 = {
  hours: "godzin",
  minutes: "minut",
  seconds: "sekund",
  meridiem: "popołudnie"
};
var plPLPickers = {
  // Calendar navigation
  previousMonth: "Poprzedni miesiąc",
  nextMonth: "Następny miesiąc",
  // View navigation
  openPreviousView: "otwórz poprzedni widok",
  openNextView: "otwórz następny widok",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "otwarty jest widok roku, przełącz na widok kalendarza" : "otwarty jest widok kalendarza, przełącz na widok roku",
  // DateRange placeholders
  start: "Początek",
  end: "Koniec",
  // Action bar
  cancelButtonLabel: "Anuluj",
  clearButtonLabel: "Wyczyść",
  okButtonLabel: "Zatwierdź",
  todayButtonLabel: "Dzisiaj",
  // Toolbar titles
  datePickerToolbarTitle: "Wybierz datę",
  dateTimePickerToolbarTitle: "Wybierz datę i czas",
  timePickerToolbarTitle: "Wybierz czas",
  dateRangePickerToolbarTitle: "Wybierz zakres dat",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Wybierz ${timeViews11[view]}. ${time === null ? "Nie wybrano czasu" : `Wybrany czas to ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} godzin`,
  minutesClockNumberText: (minutes) => `${minutes} minut`,
  secondsClockNumberText: (seconds) => `${seconds} sekund`,
  // Digital clock labels
  selectViewText: (view) => `Wybierz ${timeViews11[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Numer tygodnia",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Tydzień ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value != null && utils.isValid(value) ? `Wybierz datę, obecnie wybrana data to ${utils.format(value, "fullDate")}` : "Wybierz datę",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Wybierz czas, obecnie wybrany czas to ${utils.format(value, "fullTime")}` : "Wybierz czas",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "wybierz czas",
  dateTableLabel: "wybierz datę"
  // Field section placeholders
  // fieldYearPlaceholder: params => 'Y'.repeat(params.digitAmount),
  // fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
  // fieldDayPlaceholder: () => 'DD',
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  // fieldHoursPlaceholder: () => 'hh',
  // fieldMinutesPlaceholder: () => 'mm',
  // fieldSecondsPlaceholder: () => 'ss',
  // fieldMeridiemPlaceholder: () => 'aa',
};
var plPL = getPickersLocalization(plPLPickers);

// node_modules/@mui/x-date-pickers/locales/ptBR.js
var timeViews12 = {
  hours: "horas",
  minutes: "minutos",
  seconds: "segundos",
  meridiem: "meridiano"
};
var ptBRPickers = {
  // Calendar navigation
  previousMonth: "Mês anterior",
  nextMonth: "Próximo mês",
  // View navigation
  openPreviousView: "Abrir próxima seleção",
  openNextView: "Abrir seleção anterior",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "Seleção de ano está aberta, alternando para seleção de calendário" : "Seleção de calendários está aberta, alternando para seleção de ano",
  // DateRange placeholders
  start: "Início",
  end: "Fim",
  // Action bar
  cancelButtonLabel: "Cancelar",
  clearButtonLabel: "Limpar",
  okButtonLabel: "OK",
  todayButtonLabel: "Hoje",
  // Toolbar titles
  datePickerToolbarTitle: "Selecione a data",
  dateTimePickerToolbarTitle: "Selecione data e hora",
  timePickerToolbarTitle: "Selecione a hora",
  dateRangePickerToolbarTitle: "Selecione o intervalo entre datas",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Selecione ${timeViews12[view]}. ${time === null ? "Hora não selecionada" : `Selecionado a hora ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} horas`,
  minutesClockNumberText: (minutes) => `${minutes} minutos`,
  secondsClockNumberText: (seconds) => `${seconds} segundos`,
  // Digital clock labels
  selectViewText: (view) => `Selecione ${timeViews12[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Número da semana",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Semana ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Escolha uma data, data selecionada ${utils.format(value, "fullDate")}` : "Escolha uma data",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Escolha uma hora, hora selecionada ${utils.format(value, "fullTime")}` : "Escolha uma hora",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "escolha uma hora",
  dateTableLabel: "escolha uma data",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "A".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "SSSS" : "SS",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var ptBR = getPickersLocalization(ptBRPickers);

// node_modules/@mui/x-date-pickers/locales/roRO.js
var timeViews13 = {
  hours: "Ore",
  minutes: "Minute",
  seconds: "Secunde",
  meridiem: "Meridiane"
};
var roROPickers = {
  // Calendar navigation
  previousMonth: "Luna anterioară",
  nextMonth: "Luna următoare",
  // View navigation
  openPreviousView: "Deschideți vizualizarea anterioară",
  openNextView: "Deschideți vizualizarea următoare",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "Vizualizarea anuală este deschisă, comutați la vizualizarea calendarului" : "Vizualizarea calendarului este deschisă, comutați la vizualizarea anuală",
  // DateRange placeholders
  start: "Început",
  end: "Sfârșit",
  // Action bar
  cancelButtonLabel: "Anulare",
  clearButtonLabel: "Ștergere",
  okButtonLabel: "OK",
  todayButtonLabel: "Astăzi",
  // Toolbar titles
  datePickerToolbarTitle: "Selectați data",
  dateTimePickerToolbarTitle: "Selectați data și ora",
  timePickerToolbarTitle: "Selectați ora",
  dateRangePickerToolbarTitle: "Selectați intervalul de date",
  // Clock labels
  clockLabelText: (view, time, adapter) => {
    var _timeViews$view;
    return `Selectați ${(_timeViews$view = timeViews13[view]) != null ? _timeViews$view : view}. ${time === null ? "Nicio oră selectată" : `Ora selectată este ${adapter.format(time, "fullTime")}`}`;
  },
  hoursClockNumberText: (hours) => `${hours} ${timeViews13.hours}`,
  minutesClockNumberText: (minutes) => `${minutes} ${timeViews13.minutes}`,
  secondsClockNumberText: (seconds) => `${seconds}  ${timeViews13.seconds}`,
  // Digital clock labels
  selectViewText: (view) => `Selectați ${timeViews13[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Număr săptămână",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Săptămâna ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Selectați data, data selectată este ${utils.format(value, "fullDate")}` : "Selectați data",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Selectați ora, ora selectată este ${utils.format(value, "fullTime")}` : "Selectați ora",
  fieldClearLabel: "Golire conținut",
  // Table labels
  timeTableLabel: "Selectați ora",
  dateTableLabel: "Selectați data",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "A".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "LLLL" : "LL",
  fieldDayPlaceholder: () => "ZZ",
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var roRO = getPickersLocalization(roROPickers);

// node_modules/@mui/x-date-pickers/locales/ruRU.js
var timeViews14 = {
  hours: "часы",
  minutes: "минуты",
  seconds: "секунды",
  meridiem: "меридием"
};
var ruRUPickers = {
  // Calendar navigation
  previousMonth: "Предыдущий месяц",
  nextMonth: "Следующий месяц",
  // View navigation
  openPreviousView: "открыть предыдущий вид",
  openNextView: "открыть следующий вид",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "открыт годовой вид, переключить на календарный вид" : "открыт календарный вид, переключить на годовой вид",
  // DateRange placeholders
  start: "Начало",
  end: "Конец",
  // Action bar
  cancelButtonLabel: "Отмена",
  clearButtonLabel: "Очистить",
  okButtonLabel: "Ок",
  todayButtonLabel: "Сегодня",
  // Toolbar titles
  datePickerToolbarTitle: "Выбрать дату",
  dateTimePickerToolbarTitle: "Выбрать дату и время",
  timePickerToolbarTitle: "Выбрать время",
  dateRangePickerToolbarTitle: "Выбрать период",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Выбрать ${timeViews14[view]}. ${time === null ? "Время не выбрано" : `Выбрано время ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} часов`,
  minutesClockNumberText: (minutes) => `${minutes} минут`,
  secondsClockNumberText: (seconds) => `${seconds} секунд`,
  // Digital clock labels
  selectViewText: (view) => `Выбрать ${timeViews14[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Номер недели",
  calendarWeekNumberHeaderText: "№",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Неделя ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Выберите дату, выбрана дата ${utils.format(value, "fullDate")}` : "Выберите дату",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Выберите время, выбрано время ${utils.format(value, "fullTime")}` : "Выберите время",
  fieldClearLabel: "Очистить значение",
  // Table labels
  timeTableLabel: "выбрать время",
  dateTableLabel: "выбрать дату",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Г".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "ММММ" : "ММ",
  fieldDayPlaceholder: () => "ДД",
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => "чч",
  fieldMinutesPlaceholder: () => "мм",
  fieldSecondsPlaceholder: () => "сс",
  fieldMeridiemPlaceholder: () => "(д|п)п"
};
var ruRU = getPickersLocalization(ruRUPickers);

// node_modules/@mui/x-date-pickers/locales/skSK.js
var timeViews15 = {
  hours: "Hodiny",
  minutes: "Minúty",
  seconds: "Sekundy",
  meridiem: "Popoludnie"
};
var skSKPickers = {
  // Calendar navigation
  previousMonth: "Ďalší mesiac",
  nextMonth: "Predchádzajúci mesiac",
  // View navigation
  openPreviousView: "otvoriť predchádzajúce zobrazenie",
  openNextView: "otvoriť ďalšie zobrazenie",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "ročné zobrazenie otvorené, prepnite do zobrazenia kalendára" : "zobrazenie kalendára otvorené, prepnite do zobrazenia roka",
  // DateRange placeholders
  start: "Začiatok",
  end: "Koniec",
  // Action bar
  cancelButtonLabel: "Zrušiť",
  clearButtonLabel: "Vymazať",
  okButtonLabel: "Potvrdiť",
  todayButtonLabel: "Dnes",
  // Toolbar titles
  datePickerToolbarTitle: "Vyberte dátum",
  dateTimePickerToolbarTitle: "Vyberte dátum a čas",
  timePickerToolbarTitle: "Vyberte čas",
  dateRangePickerToolbarTitle: "Vyberete rozmedzie dátumov",
  // Clock labels
  clockLabelText: (view, time, adapter) => {
    var _timeViews$view;
    return `${(_timeViews$view = timeViews15[view]) != null ? _timeViews$view : view} vybraný. ${time === null ? "Nie je vybraný čas" : `Vybraný čas je ${adapter.format(time, "fullTime")}`}`;
  },
  hoursClockNumberText: (hours) => `${hours} hodín`,
  minutesClockNumberText: (minutes) => `${minutes} minút`,
  secondsClockNumberText: (seconds) => `${seconds} sekúnd`,
  // Digital clock labels
  selectViewText: (view) => `Vyberte ${timeViews15[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Týždeň v roku",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `${weekNumber} týždeň v roku`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Vyberte dátum, vybraný dátum je ${utils.format(value, "fullDate")}` : "Vyberte dátum",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Vyberte čas, vybraný čas je ${utils.format(value, "fullTime")}` : "Vyberte čas",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "vyberte čas",
  dateTableLabel: "vyberte dátum",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var skSK = getPickersLocalization(skSKPickers);

// node_modules/@mui/x-date-pickers/locales/svSE.js
var timeViews16 = {
  hours: "timmar",
  minutes: "minuter",
  seconds: "sekunder",
  meridiem: "meridiem"
};
var svSEPickers = {
  // Calendar navigation
  previousMonth: "Föregående månad",
  nextMonth: "Nästa månad",
  // View navigation
  openPreviousView: "öppna föregående vy",
  openNextView: "öppna nästa vy",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "årsvyn är öppen, byt till kalendervy" : "kalendervyn är öppen, byt till årsvy",
  // DateRange placeholders
  start: "Start",
  end: "Slut",
  // Action bar
  cancelButtonLabel: "Avbryt",
  clearButtonLabel: "Rensa",
  okButtonLabel: "OK",
  todayButtonLabel: "Idag",
  // Toolbar titles
  datePickerToolbarTitle: "Välj datum",
  dateTimePickerToolbarTitle: "Välj datum & tid",
  timePickerToolbarTitle: "Välj tid",
  dateRangePickerToolbarTitle: "Välj datumintervall",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Välj ${timeViews16[view]}. ${time === null ? "Ingen tid vald" : `Vald tid är ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} timmar`,
  minutesClockNumberText: (minutes) => `${minutes} minuter`,
  secondsClockNumberText: (seconds) => `${seconds} sekunder`,
  // Digital clock labels
  selectViewText: (view) => `Välj ${timeViews16[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Vecka nummer",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Vecka ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Välj datum, valt datum är ${utils.format(value, "fullDate")}` : "Välj datum",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Välj tid, vald tid är ${utils.format(value, "fullTime")}` : "Välj tid",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "välj tid",
  dateTableLabel: "välj datum"
  // Field section placeholders
  // fieldYearPlaceholder: params => 'Y'.repeat(params.digitAmount),
  // fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
  // fieldDayPlaceholder: () => 'DD',
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  // fieldHoursPlaceholder: () => 'hh',
  // fieldMinutesPlaceholder: () => 'mm',
  // fieldSecondsPlaceholder: () => 'ss',
  // fieldMeridiemPlaceholder: () => 'aa',
};
var svSE = getPickersLocalization(svSEPickers);

// node_modules/@mui/x-date-pickers/locales/trTR.js
var timeViews17 = {
  hours: "saat",
  minutes: "dakika",
  seconds: "saniye",
  meridiem: "öğleden sonra"
};
var trTRPickers = {
  // Calendar navigation
  previousMonth: "Önceki ay",
  nextMonth: "Sonraki ay",
  // View navigation
  openPreviousView: "sonraki görünüm",
  openNextView: "önceki görünüm",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "yıl görünümü açık, takvim görünümüne geç" : "takvim görünümü açık, yıl görünümüne geç",
  // DateRange placeholders
  start: "Başlangıç",
  end: "Bitiş",
  // Action bar
  cancelButtonLabel: "iptal",
  clearButtonLabel: "Temizle",
  okButtonLabel: "Tamam",
  todayButtonLabel: "Bugün",
  // Toolbar titles
  datePickerToolbarTitle: "Tarih Seç",
  dateTimePickerToolbarTitle: "Tarih & Saat seç",
  timePickerToolbarTitle: "Saat seç",
  dateRangePickerToolbarTitle: "Tarih aralığı seçin",
  // Clock labels
  clockLabelText: (view, time, adapter) => `${timeViews17[view]} seç.  ${time === null ? "Zaman seçilmedi" : `Seçilen zaman: ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} saat`,
  minutesClockNumberText: (minutes) => `${minutes} dakika`,
  secondsClockNumberText: (seconds) => `${seconds} saniye`,
  // Digital clock labels
  selectViewText: (view) => `Seç ${timeViews17[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Hafta numarası",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Hafta ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Tarih seçin, seçilen tarih: ${utils.format(value, "fullDate")}` : "Tarih seç",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Saat seçin, seçilen saat: ${utils.format(value, "fullTime")}` : "Saat seç",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "saat seç",
  dateTableLabel: "tarih seç",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "AAA" : "AA",
  fieldDayPlaceholder: () => "GG",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "HHH" : "HH",
  fieldHoursPlaceholder: () => "ss",
  fieldMinutesPlaceholder: () => "dd",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var trTR = getPickersLocalization(trTRPickers);

// node_modules/@mui/x-date-pickers/locales/ukUA.js
var timeViews18 = {
  hours: "годин",
  minutes: "хвилин",
  seconds: "секунд",
  meridiem: "Південь"
};
var ukUAPickers = {
  // Calendar navigation
  previousMonth: "Попередній місяць",
  nextMonth: "Наступний місяць",
  // View navigation
  openPreviousView: "відкрити попередній вигляд",
  openNextView: "відкрити наступний вигляд",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "річний вигляд відкрито, перейти до календарного вигляду" : "календарний вигляд відкрито, перейти до річного вигляду",
  // DateRange placeholders
  start: "Початок",
  end: "Кінець",
  // Action bar
  cancelButtonLabel: "Відміна",
  clearButtonLabel: "Очистити",
  okButtonLabel: "OK",
  todayButtonLabel: "Сьогодні",
  // Toolbar titles
  datePickerToolbarTitle: "Вибрати дату",
  dateTimePickerToolbarTitle: "Вибрати дату і час",
  timePickerToolbarTitle: "Вибрати час",
  dateRangePickerToolbarTitle: "Вибрати календарний період",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Вибрати ${timeViews18[view]}. ${time === null ? "Час не вибраний" : `Вибрано час ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} годин`,
  minutesClockNumberText: (minutes) => `${minutes} хвилин`,
  secondsClockNumberText: (seconds) => `${seconds} секунд`,
  // Digital clock labels
  selectViewText: (view) => `Вибрати ${timeViews18[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Номер тижня",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Тиждень ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Оберіть дату, обрана дата  ${utils.format(value, "fullDate")}` : "Оберіть дату",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Оберіть час, обраний час  ${utils.format(value, "fullTime")}` : "Оберіть час",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "оберіть час",
  dateTableLabel: "оберіть дату",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var ukUA = getPickersLocalization(ukUAPickers);

// node_modules/@mui/x-date-pickers/locales/urPK.js
var timeViews19 = {
  hours: "گھنٹے",
  minutes: "منٹ",
  seconds: "سیکنڈ",
  meridiem: "میریڈیم"
};
var urPKPickers = {
  // Calendar navigation
  previousMonth: "پچھلا مہینہ",
  nextMonth: "اگلا مہینہ",
  // View navigation
  openPreviousView: "پچھلا ویو کھولیں",
  openNextView: "اگلا ویو کھولیں",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "سال والا ویو کھلا ہے۔ کیلنڈر والا ویو کھولیں" : "کیلنڈر والا ویو کھلا ہے۔ سال والا ویو کھولیں",
  // DateRange placeholders
  start: "شروع",
  end: "ختم",
  // Action bar
  cancelButtonLabel: "کینسل",
  clearButtonLabel: "کلئیر",
  okButtonLabel: "اوکے",
  todayButtonLabel: "آج",
  // Toolbar titles
  datePickerToolbarTitle: "تاریخ منتخب کریں",
  dateTimePickerToolbarTitle: "تاریخ اور وقت منتخب کریں",
  timePickerToolbarTitle: "وقت منتخب کریں",
  dateRangePickerToolbarTitle: "تاریخوں کی رینج منتخب کریں",
  // Clock labels
  clockLabelText: (view, time, adapter) => `${timeViews19[view]} منتخب کریں ${time === null ? "کوئی وقت منتخب نہیں" : `منتخب وقت ہے ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} گھنٹے`,
  minutesClockNumberText: (minutes) => `${minutes} منٹ`,
  secondsClockNumberText: (seconds) => `${seconds} سیکنڈ`,
  // Digital clock labels
  selectViewText: (view) => `${timeViews19[view]} منتخب کریں`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "ہفتہ نمبر",
  calendarWeekNumberHeaderText: "نمبر",
  calendarWeekNumberAriaLabelText: (weekNumber) => `ہفتہ ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `تاریخ منتخب کریں، منتخب شدہ تاریخ ہے ${utils.format(value, "fullDate")}` : "تاریخ منتخب کریں",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `وقت منتخب کریں، منتخب شدہ وقت ہے ${utils.format(value, "fullTime")}` : "وقت منتخب کریں",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "وقت منتخب کریں",
  dateTableLabel: "تاریخ منتخب کریں"
  // Field section placeholders
  // fieldYearPlaceholder: params => 'Y'.repeat(params.digitAmount),
  // fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
  // fieldDayPlaceholder: () => 'DD',
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  // fieldHoursPlaceholder: () => 'hh',
  // fieldMinutesPlaceholder: () => 'mm',
  // fieldSecondsPlaceholder: () => 'ss',
  // fieldMeridiemPlaceholder: () => 'aa',
};
var urPK = getPickersLocalization(urPKPickers);

// node_modules/@mui/x-date-pickers/locales/viVN.js
var views11 = {
  hours: "giờ",
  minutes: "phút",
  seconds: "giây",
  meridiem: "buổi"
};
var viVNPickers = {
  // Calendar navigation
  previousMonth: "Tháng trước",
  nextMonth: "Tháng sau",
  // View navigation
  openPreviousView: "mở xem trước",
  openNextView: "mở xem sau",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "đang mở xem năm, chuyển sang xem lịch" : "đang mở xem lịch, chuyển sang xem năm",
  // DateRange placeholders
  start: "Bắt đầu",
  end: "Kết thúc",
  // Action bar
  cancelButtonLabel: "Hủy",
  clearButtonLabel: "Xóa",
  okButtonLabel: "OK",
  todayButtonLabel: "Hôm nay",
  // Toolbar titles
  datePickerToolbarTitle: "Chọn ngày",
  dateTimePickerToolbarTitle: "Chọn ngày và giờ",
  timePickerToolbarTitle: "Chọn giờ",
  dateRangePickerToolbarTitle: "Chọn khoảng ngày",
  // Clock labels
  clockLabelText: (view, time, adapter) => `Chọn ${views11[view]}. ${time === null ? "Không có giờ được chọn" : `Giờ được chọn là ${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours} giờ`,
  minutesClockNumberText: (minutes) => `${minutes} phút`,
  secondsClockNumberText: (seconds) => `${seconds} giây`,
  // Digital clock labels
  selectViewText: (view) => `Chọn ${views11[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "Số tuần",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `Tuần ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Chọn ngày, ngày đã chọn là ${utils.format(value, "fullDate")}` : "Chọn ngày",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Chọn giờ, giờ đã chọn là ${utils.format(value, "fullTime")}` : "Chọn giờ",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "chọn giờ",
  dateTableLabel: "chọn ngày",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var viVN = getPickersLocalization(viVNPickers);

// node_modules/@mui/x-date-pickers/locales/zhCN.js
var views12 = {
  hours: "小时",
  minutes: "分钟",
  seconds: "秒",
  meridiem: "子午线"
};
var zhCNPickers = {
  // Calendar navigation
  previousMonth: "上个月",
  nextMonth: "下个月",
  // View navigation
  openPreviousView: "前一个视图",
  openNextView: "下一个视图",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "年视图已打开，切换为日历视图" : "日历视图已打开，切换为年视图",
  // DateRange placeholders
  start: "开始",
  end: "结束",
  // Action bar
  cancelButtonLabel: "取消",
  clearButtonLabel: "清除",
  okButtonLabel: "确认",
  todayButtonLabel: "今天",
  // Toolbar titles
  datePickerToolbarTitle: "选择日期",
  dateTimePickerToolbarTitle: "选择日期和时间",
  timePickerToolbarTitle: "选择时间",
  dateRangePickerToolbarTitle: "选择时间范围",
  // Clock labels
  clockLabelText: (view, time, adapter) => `选择 ${views12[view]}. ${time === null ? "未选择时间" : `已选择${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours}小时`,
  minutesClockNumberText: (minutes) => `${minutes}分钟`,
  secondsClockNumberText: (seconds) => `${seconds}秒`,
  // Digital clock labels
  selectViewText: (view) => `选择 ${views12[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "周数",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `第${weekNumber}周`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `选择日期，已选择${utils.format(value, "fullDate")}` : "选择日期",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `选择时间，已选择${utils.format(value, "fullTime")}` : "选择时间",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "选择时间",
  dateTableLabel: "选择日期",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var zhCN = getPickersLocalization(zhCNPickers);

// node_modules/@mui/x-date-pickers/locales/zhHK.js
var views13 = {
  hours: "小時",
  minutes: "分鐘",
  seconds: "秒",
  meridiem: "子午線"
};
var zhHKPickers = {
  // Calendar navigation
  previousMonth: "上個月",
  nextMonth: "下個月",
  // View navigation
  openPreviousView: "前一個檢視表",
  openNextView: "下一個檢視表",
  calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "年份檢視表已打開，切換以檢視日曆" : "日曆檢視表已打開，切換以檢視年份",
  // DateRange placeholders
  start: "開始",
  end: "結束",
  // Action bar
  cancelButtonLabel: "取消",
  clearButtonLabel: "清除",
  okButtonLabel: "確認",
  todayButtonLabel: "今日",
  // Toolbar titles
  datePickerToolbarTitle: "選擇日期",
  dateTimePickerToolbarTitle: "選擇日期和時間",
  timePickerToolbarTitle: "選擇時間",
  dateRangePickerToolbarTitle: "選擇時間範圍",
  // Clock labels
  clockLabelText: (view, time, adapter) => `選擇 ${views13[view]}. ${time === null ? "未選擇時間" : `已選擇${adapter.format(time, "fullTime")}`}`,
  hoursClockNumberText: (hours) => `${hours}小時`,
  minutesClockNumberText: (minutes) => `${minutes}分鐘`,
  secondsClockNumberText: (seconds) => `${seconds}秒`,
  // Digital clock labels
  selectViewText: (view) => `選擇 ${views13[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: "週數",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `第${weekNumber}週`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `選擇日期，已選擇${utils.format(value, "fullDate")}` : "選擇日期",
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `選擇時間，已選擇${utils.format(value, "fullTime")}` : "選擇時間",
  // fieldClearLabel: 'Clear value',
  // Table labels
  timeTableLabel: "選擇時間",
  dateTableLabel: "選擇日期",
  // Field section placeholders
  fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
  fieldDayPlaceholder: () => "DD",
  fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
  fieldHoursPlaceholder: () => "hh",
  fieldMinutesPlaceholder: () => "mm",
  fieldSecondsPlaceholder: () => "ss",
  fieldMeridiemPlaceholder: () => "aa"
};
var zhHK = getPickersLocalization(zhHKPickers);

// node_modules/@mui/x-date-pickers/DayCalendarSkeleton/DayCalendarSkeleton.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_esm();

// node_modules/@mui/x-date-pickers/DayCalendarSkeleton/dayCalendarSkeletonClasses.js
init_esm();
var getDayCalendarSkeletonUtilityClass = (slot) => generateUtilityClass("MuiDayCalendarSkeleton", slot);
var dayCalendarSkeletonClasses = generateUtilityClasses("MuiDayCalendarSkeleton", ["root", "week", "daySkeleton"]);

// node_modules/@mui/x-date-pickers/DayCalendarSkeleton/DayCalendarSkeleton.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["className"];
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    week: ["week"],
    daySkeleton: ["daySkeleton"]
  };
  return composeClasses(slots, getDayCalendarSkeletonUtilityClass, classes);
};
var DayCalendarSkeletonRoot = styled_default("div", {
  name: "MuiDayCalendarSkeleton",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  alignSelf: "start"
});
var DayCalendarSkeletonWeek = styled_default("div", {
  name: "MuiDayCalendarSkeleton",
  slot: "Week",
  overridesResolver: (props, styles) => styles.week
})({
  margin: `${DAY_MARGIN}px 0`,
  display: "flex",
  justifyContent: "center"
});
var DayCalendarSkeletonDay = styled_default(Skeleton_default, {
  name: "MuiDayCalendarSkeleton",
  slot: "DaySkeleton",
  overridesResolver: (props, styles) => styles.daySkeleton
})(({
  ownerState
}) => _extends({
  margin: `0 ${DAY_MARGIN}px`
}, ownerState.day === 0 && {
  visibility: "hidden"
}));
DayCalendarSkeletonDay.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  ownerState: import_prop_types.default.shape({
    day: import_prop_types.default.number.isRequired
  }).isRequired
};
var monthMap = [[0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 0, 0]];
function DayCalendarSkeleton(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiDayCalendarSkeleton"
  });
  const {
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const classes = useUtilityClasses(other);
  return (0, import_jsx_runtime.jsx)(DayCalendarSkeletonRoot, _extends({
    className: clsx_default(classes.root, className)
  }, other, {
    children: monthMap.map((week, index) => (0, import_jsx_runtime.jsx)(DayCalendarSkeletonWeek, {
      className: classes.week,
      children: week.map((day, index2) => (0, import_jsx_runtime.jsx)(DayCalendarSkeletonDay, {
        variant: "circular",
        width: DAY_SIZE,
        height: DAY_SIZE,
        className: classes.daySkeleton,
        ownerState: {
          day
        }
      }, index2))
    }, index))
  }));
}
true ? DayCalendarSkeleton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;

// node_modules/@mui/x-date-pickers/StaticDatePicker/StaticDatePicker.js
init_extends();
var React2 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
var StaticDatePicker = React2.forwardRef(function StaticDatePicker2(inProps, ref) {
  var _defaultizedProps$dis, _defaultizedProps$yea, _defaultizedProps$slo;
  const defaultizedProps = useDatePickerDefaultizedProps(inProps, "MuiStaticDatePicker");
  const displayStaticWrapperAs = (_defaultizedProps$dis = defaultizedProps.displayStaticWrapperAs) != null ? _defaultizedProps$dis : "mobile";
  const viewRenderers = _extends({
    day: renderDateViewCalendar,
    month: renderDateViewCalendar,
    year: renderDateViewCalendar
  }, defaultizedProps.viewRenderers);
  const props = _extends({}, defaultizedProps, {
    viewRenderers,
    displayStaticWrapperAs,
    yearsPerRow: (_defaultizedProps$yea = defaultizedProps.yearsPerRow) != null ? _defaultizedProps$yea : displayStaticWrapperAs === "mobile" ? 3 : 4,
    slotProps: _extends({}, defaultizedProps.slotProps, {
      toolbar: _extends({
        hidden: displayStaticWrapperAs === "desktop"
      }, (_defaultizedProps$slo = defaultizedProps.slotProps) == null ? void 0 : _defaultizedProps$slo.toolbar)
    })
  });
  const {
    renderPicker
  } = useStaticPicker({
    props,
    valueManager: singleItemValueManager,
    valueType: "date",
    validator: validateDate,
    ref
  });
  return renderPicker();
});
StaticDatePicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the main element is focused during the first mount.
   * This main element is:
   * - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
   * - the `input` element if there is a field rendered.
   */
  autoFocus: import_prop_types2.default.bool,
  /**
   * Class name applied to the root element.
   */
  className: import_prop_types2.default.string,
  /**
   * Overridable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components: import_prop_types2.default.object,
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps: import_prop_types2.default.object,
  /**
   * Formats the day of week displayed in the calendar header.
   * @param {string} day The day of week provided by the adapter.  Deprecated, will be removed in v7: Use `date` instead.
   * @param {TDate} date The date of the day of week provided by the adapter.
   * @returns {string} The name to display.
   * @default (_day: string, date: TDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
   */
  dayOfWeekFormatter: import_prop_types2.default.func,
  /**
   * Default calendar month displayed when `value` and `defaultValue` are empty.
   * @deprecated Consider using `referenceDate` instead.
   */
  defaultCalendarMonth: import_prop_types2.default.any,
  /**
   * The default value.
   * Used when the component is not controlled.
   */
  defaultValue: import_prop_types2.default.any,
  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled: import_prop_types2.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types2.default.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: import_prop_types2.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types2.default.bool,
  /**
   * Force static wrapper inner components to be rendered in mobile or desktop mode.
   * @default "mobile"
   */
  displayStaticWrapperAs: import_prop_types2.default.oneOf(["desktop", "mobile"]),
  /**
   * If `true`, the week number will be display in the calendar.
   */
  displayWeekNumber: import_prop_types2.default.bool,
  /**
   * Calendar will show more weeks in order to match this value.
   * Put it to 6 for having fix number of week in Gregorian calendars
   * @default undefined
   */
  fixedWeekNumber: import_prop_types2.default.number,
  /**
   * If `true`, calls `renderLoading` instead of rendering the day calendar.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: import_prop_types2.default.bool,
  /**
   * Locale for components texts.
   * Allows overriding texts coming from `LocalizationProvider` and `theme`.
   */
  localeText: import_prop_types2.default.object,
  /**
   * Maximal selectable date.
   */
  maxDate: import_prop_types2.default.any,
  /**
   * Minimal selectable date.
   */
  minDate: import_prop_types2.default.any,
  /**
   * Months rendered per row.
   * @default 3
   */
  monthsPerRow: import_prop_types2.default.oneOf([3, 4]),
  /**
   * Callback fired when the value is accepted.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The value that was just accepted.
   */
  onAccept: import_prop_types2.default.func,
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The new value.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onChange: import_prop_types2.default.func,
  /**
   * Callback fired when component requests to be closed.
   * Can be fired when selecting (by default on `desktop` mode) or clearing a value.
   * @deprecated Please avoid using as it will be removed in next major version.
   */
  onClose: import_prop_types2.default.func,
  /**
   * Callback fired when the error associated to the current value changes.
   * If the error has a non-null value, then the `TextField` will be rendered in `error` state.
   *
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TError} error The new error describing why the current value is not valid.
   * @param {TValue} value The value associated to the error.
   */
  onError: import_prop_types2.default.func,
  /**
   * Callback fired on month change.
   * @template TDate
   * @param {TDate} month The new month.
   */
  onMonthChange: import_prop_types2.default.func,
  /**
   * Callback fired on view change.
   * @template TView
   * @param {TView} view The new view.
   */
  onViewChange: import_prop_types2.default.func,
  /**
   * Callback fired on year change.
   * @template TDate
   * @param {TDate} year The new year.
   */
  onYearChange: import_prop_types2.default.func,
  /**
   * The default visible view.
   * Used when the component view is not controlled.
   * Must be a valid option from `views` list.
   */
  openTo: import_prop_types2.default.oneOf(["day", "month", "year"]),
  /**
   * Force rendering in particular orientation.
   */
  orientation: import_prop_types2.default.oneOf(["landscape", "portrait"]),
  readOnly: import_prop_types2.default.bool,
  /**
   * If `true`, disable heavy animations.
   * @default `@media(prefers-reduced-motion: reduce)` || `navigator.userAgent` matches Android <10 or iOS <13
   */
  reduceAnimations: import_prop_types2.default.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid date-time using the validation props, except callbacks like `shouldDisable<...>`.
   */
  referenceDate: import_prop_types2.default.any,
  /**
   * Component displaying when passed `loading` true.
   * @returns {React.ReactNode} The node to render when loading.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: import_prop_types2.default.func,
  /**
   * Disable specific date.
   *
   * Warning: This function can be called multiple times (e.g. when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
   *
   * @template TDate
   * @param {TDate} day The date to test.
   * @returns {boolean} If `true` the date will be disabled.
   */
  shouldDisableDate: import_prop_types2.default.func,
  /**
   * Disable specific month.
   * @template TDate
   * @param {TDate} month The month to test.
   * @returns {boolean} If `true`, the month will be disabled.
   */
  shouldDisableMonth: import_prop_types2.default.func,
  /**
   * Disable specific year.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} If `true`, the year will be disabled.
   */
  shouldDisableYear: import_prop_types2.default.func,
  /**
   * If `true`, days outside the current month are rendered:
   *
   * - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
   *
   * - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
   *
   * - ignored if `calendars` equals more than `1` on range pickers.
   * @default false
   */
  showDaysOutsideCurrentMonth: import_prop_types2.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types2.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types2.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documention} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types2.default.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types2.default.any,
  /**
   * The visible view.
   * Used when the component view is controlled.
   * Must be a valid option from `views` list.
   */
  view: import_prop_types2.default.oneOf(["day", "month", "year"]),
  /**
   * Define custom view renderers for each section.
   * If `null`, the section will only have field editing.
   * If `undefined`, internally defined view will be the used.
   */
  viewRenderers: import_prop_types2.default.shape({
    day: import_prop_types2.default.func,
    month: import_prop_types2.default.func,
    year: import_prop_types2.default.func
  }),
  /**
   * Available views.
   */
  views: import_prop_types2.default.arrayOf(import_prop_types2.default.oneOf(["day", "month", "year"]).isRequired),
  /**
   * Years rendered per row.
   * @default 3
   */
  yearsPerRow: import_prop_types2.default.oneOf([3, 4])
};

// node_modules/@mui/x-date-pickers/StaticTimePicker/StaticTimePicker.js
init_extends();
var React3 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());
var StaticTimePicker = React3.forwardRef(function StaticTimePicker2(inProps, ref) {
  var _defaultizedProps$dis, _defaultizedProps$amp, _defaultizedProps$slo;
  const defaultizedProps = useTimePickerDefaultizedProps(inProps, "MuiStaticTimePicker");
  const displayStaticWrapperAs = (_defaultizedProps$dis = defaultizedProps.displayStaticWrapperAs) != null ? _defaultizedProps$dis : "mobile";
  const ampmInClock = (_defaultizedProps$amp = defaultizedProps.ampmInClock) != null ? _defaultizedProps$amp : displayStaticWrapperAs === "desktop";
  const viewRenderers = _extends({
    hours: renderTimeViewClock,
    minutes: renderTimeViewClock,
    seconds: renderTimeViewClock
  }, defaultizedProps.viewRenderers);
  const props = _extends({}, defaultizedProps, {
    viewRenderers,
    displayStaticWrapperAs,
    ampmInClock,
    slotProps: _extends({}, defaultizedProps.slotProps, {
      toolbar: _extends({
        hidden: displayStaticWrapperAs === "desktop",
        ampmInClock
      }, (_defaultizedProps$slo = defaultizedProps.slotProps) == null ? void 0 : _defaultizedProps$slo.toolbar)
    })
  });
  const {
    renderPicker
  } = useStaticPicker({
    props,
    valueManager: singleItemValueManager,
    valueType: "time",
    validator: validateTime,
    ref
  });
  return renderPicker();
});
StaticTimePicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * 12h/24h view for hour selection clock.
   * @default `utils.is12HourCycleInCurrentLocale()`
   */
  ampm: import_prop_types3.default.bool,
  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   * @default true on desktop, false on mobile
   */
  ampmInClock: import_prop_types3.default.bool,
  /**
   * If `true`, the main element is focused during the first mount.
   * This main element is:
   * - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
   * - the `input` element if there is a field rendered.
   */
  autoFocus: import_prop_types3.default.bool,
  /**
   * Class name applied to the root element.
   */
  className: import_prop_types3.default.string,
  /**
   * Overridable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components: import_prop_types3.default.object,
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps: import_prop_types3.default.object,
  /**
   * The default value.
   * Used when the component is not controlled.
   */
  defaultValue: import_prop_types3.default.any,
  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled: import_prop_types3.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types3.default.bool,
  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: import_prop_types3.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types3.default.bool,
  /**
   * Force static wrapper inner components to be rendered in mobile or desktop mode.
   * @default "mobile"
   */
  displayStaticWrapperAs: import_prop_types3.default.oneOf(["desktop", "mobile"]),
  /**
   * Locale for components texts.
   * Allows overriding texts coming from `LocalizationProvider` and `theme`.
   */
  localeText: import_prop_types3.default.object,
  /**
   * Maximal selectable time.
   * The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
   */
  maxTime: import_prop_types3.default.any,
  /**
   * Minimal selectable time.
   * The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
   */
  minTime: import_prop_types3.default.any,
  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: import_prop_types3.default.number,
  /**
   * Callback fired when the value is accepted.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The value that was just accepted.
   */
  onAccept: import_prop_types3.default.func,
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The new value.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onChange: import_prop_types3.default.func,
  /**
   * Callback fired when component requests to be closed.
   * Can be fired when selecting (by default on `desktop` mode) or clearing a value.
   * @deprecated Please avoid using as it will be removed in next major version.
   */
  onClose: import_prop_types3.default.func,
  /**
   * Callback fired when the error associated to the current value changes.
   * If the error has a non-null value, then the `TextField` will be rendered in `error` state.
   *
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TError} error The new error describing why the current value is not valid.
   * @param {TValue} value The value associated to the error.
   */
  onError: import_prop_types3.default.func,
  /**
   * Callback fired on view change.
   * @template TView
   * @param {TView} view The new view.
   */
  onViewChange: import_prop_types3.default.func,
  /**
   * The default visible view.
   * Used when the component view is not controlled.
   * Must be a valid option from `views` list.
   */
  openTo: import_prop_types3.default.oneOf(["hours", "minutes", "seconds"]),
  /**
   * Force rendering in particular orientation.
   */
  orientation: import_prop_types3.default.oneOf(["landscape", "portrait"]),
  readOnly: import_prop_types3.default.bool,
  /**
   * If `true`, disable heavy animations.
   * @default `@media(prefers-reduced-motion: reduce)` || `navigator.userAgent` matches Android <10 or iOS <13
   */
  reduceAnimations: import_prop_types3.default.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid date-time using the validation props, except callbacks like `shouldDisable<...>`.
   */
  referenceDate: import_prop_types3.default.any,
  /**
   * Disable specific clock time.
   * @param {number} clockValue The value to check.
   * @param {TimeView} view The clock type of the timeValue.
   * @returns {boolean} If `true` the time will be disabled.
   * @deprecated Consider using `shouldDisableTime`.
   */
  shouldDisableClock: import_prop_types3.default.func,
  /**
   * Disable specific time.
   * @template TDate
   * @param {TDate} value The value to check.
   * @param {TimeView} view The clock type of the timeValue.
   * @returns {boolean} If `true` the time will be disabled.
   */
  shouldDisableTime: import_prop_types3.default.func,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types3.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types3.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types3.default.oneOfType([import_prop_types3.default.arrayOf(import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object, import_prop_types3.default.bool])), import_prop_types3.default.func, import_prop_types3.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documention} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types3.default.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types3.default.any,
  /**
   * The visible view.
   * Used when the component view is controlled.
   * Must be a valid option from `views` list.
   */
  view: import_prop_types3.default.oneOf(["hours", "minutes", "seconds"]),
  /**
   * Define custom view renderers for each section.
   * If `null`, the section will only have field editing.
   * If `undefined`, internally defined view will be the used.
   */
  viewRenderers: import_prop_types3.default.shape({
    hours: import_prop_types3.default.func,
    minutes: import_prop_types3.default.func,
    seconds: import_prop_types3.default.func
  }),
  /**
   * Available views.
   */
  views: import_prop_types3.default.arrayOf(import_prop_types3.default.oneOf(["hours", "minutes", "seconds"]).isRequired)
};

// node_modules/@mui/x-date-pickers/StaticDateTimePicker/StaticDateTimePicker.js
init_extends();
var React4 = __toESM(require_react());
var import_prop_types4 = __toESM(require_prop_types());
var StaticDateTimePicker = React4.forwardRef(function StaticDateTimePicker2(inProps, ref) {
  var _defaultizedProps$dis, _defaultizedProps$amp, _defaultizedProps$yea, _defaultizedProps$slo, _defaultizedProps$slo2;
  const defaultizedProps = useDateTimePickerDefaultizedProps(inProps, "MuiStaticDateTimePicker");
  const displayStaticWrapperAs = (_defaultizedProps$dis = defaultizedProps.displayStaticWrapperAs) != null ? _defaultizedProps$dis : "mobile";
  const ampmInClock = (_defaultizedProps$amp = defaultizedProps.ampmInClock) != null ? _defaultizedProps$amp : displayStaticWrapperAs === "desktop";
  const viewRenderers = _extends({
    day: renderDateViewCalendar,
    month: renderDateViewCalendar,
    year: renderDateViewCalendar,
    hours: renderTimeViewClock,
    minutes: renderTimeViewClock,
    seconds: renderTimeViewClock
  }, defaultizedProps.viewRenderers);
  const props = _extends({}, defaultizedProps, {
    viewRenderers,
    displayStaticWrapperAs,
    ampmInClock,
    yearsPerRow: (_defaultizedProps$yea = defaultizedProps.yearsPerRow) != null ? _defaultizedProps$yea : displayStaticWrapperAs === "mobile" ? 3 : 4,
    slotProps: _extends({}, defaultizedProps.slotProps, {
      tabs: _extends({
        hidden: displayStaticWrapperAs === "desktop"
      }, (_defaultizedProps$slo = defaultizedProps.slotProps) == null ? void 0 : _defaultizedProps$slo.tabs),
      toolbar: _extends({
        hidden: displayStaticWrapperAs === "desktop",
        ampmInClock
      }, (_defaultizedProps$slo2 = defaultizedProps.slotProps) == null ? void 0 : _defaultizedProps$slo2.toolbar)
    })
  });
  const {
    renderPicker
  } = useStaticPicker({
    props,
    valueManager: singleItemValueManager,
    valueType: "date-time",
    validator: validateDateTime,
    ref
  });
  return renderPicker();
});
StaticDateTimePicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * 12h/24h view for hour selection clock.
   * @default `utils.is12HourCycleInCurrentLocale()`
   */
  ampm: import_prop_types4.default.bool,
  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   * @default true on desktop, false on mobile
   */
  ampmInClock: import_prop_types4.default.bool,
  /**
   * If `true`, the main element is focused during the first mount.
   * This main element is:
   * - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
   * - the `input` element if there is a field rendered.
   */
  autoFocus: import_prop_types4.default.bool,
  /**
   * Class name applied to the root element.
   */
  className: import_prop_types4.default.string,
  /**
   * Overridable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components: import_prop_types4.default.object,
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps: import_prop_types4.default.object,
  /**
   * Formats the day of week displayed in the calendar header.
   * @param {string} day The day of week provided by the adapter.  Deprecated, will be removed in v7: Use `date` instead.
   * @param {TDate} date The date of the day of week provided by the adapter.
   * @returns {string} The name to display.
   * @default (_day: string, date: TDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
   */
  dayOfWeekFormatter: import_prop_types4.default.func,
  /**
   * Default calendar month displayed when `value` and `defaultValue` are empty.
   * @deprecated Consider using `referenceDate` instead.
   */
  defaultCalendarMonth: import_prop_types4.default.any,
  /**
   * The default value.
   * Used when the component is not controlled.
   */
  defaultValue: import_prop_types4.default.any,
  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled: import_prop_types4.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: import_prop_types4.default.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: import_prop_types4.default.bool,
  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: import_prop_types4.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: import_prop_types4.default.bool,
  /**
   * Force static wrapper inner components to be rendered in mobile or desktop mode.
   * @default "mobile"
   */
  displayStaticWrapperAs: import_prop_types4.default.oneOf(["desktop", "mobile"]),
  /**
   * If `true`, the week number will be display in the calendar.
   */
  displayWeekNumber: import_prop_types4.default.bool,
  /**
   * Calendar will show more weeks in order to match this value.
   * Put it to 6 for having fix number of week in Gregorian calendars
   * @default undefined
   */
  fixedWeekNumber: import_prop_types4.default.number,
  /**
   * If `true`, calls `renderLoading` instead of rendering the day calendar.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: import_prop_types4.default.bool,
  /**
   * Locale for components texts.
   * Allows overriding texts coming from `LocalizationProvider` and `theme`.
   */
  localeText: import_prop_types4.default.object,
  /**
   * Maximal selectable date.
   */
  maxDate: import_prop_types4.default.any,
  /**
   * Maximal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
   */
  maxDateTime: import_prop_types4.default.any,
  /**
   * Maximal selectable time.
   * The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
   */
  maxTime: import_prop_types4.default.any,
  /**
   * Minimal selectable date.
   */
  minDate: import_prop_types4.default.any,
  /**
   * Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
   */
  minDateTime: import_prop_types4.default.any,
  /**
   * Minimal selectable time.
   * The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
   */
  minTime: import_prop_types4.default.any,
  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: import_prop_types4.default.number,
  /**
   * Months rendered per row.
   * @default 3
   */
  monthsPerRow: import_prop_types4.default.oneOf([3, 4]),
  /**
   * Callback fired when the value is accepted.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The value that was just accepted.
   */
  onAccept: import_prop_types4.default.func,
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The new value.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onChange: import_prop_types4.default.func,
  /**
   * Callback fired when component requests to be closed.
   * Can be fired when selecting (by default on `desktop` mode) or clearing a value.
   * @deprecated Please avoid using as it will be removed in next major version.
   */
  onClose: import_prop_types4.default.func,
  /**
   * Callback fired when the error associated to the current value changes.
   * If the error has a non-null value, then the `TextField` will be rendered in `error` state.
   *
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TError} error The new error describing why the current value is not valid.
   * @param {TValue} value The value associated to the error.
   */
  onError: import_prop_types4.default.func,
  /**
   * Callback fired on month change.
   * @template TDate
   * @param {TDate} month The new month.
   */
  onMonthChange: import_prop_types4.default.func,
  /**
   * Callback fired on view change.
   * @template TView
   * @param {TView} view The new view.
   */
  onViewChange: import_prop_types4.default.func,
  /**
   * Callback fired on year change.
   * @template TDate
   * @param {TDate} year The new year.
   */
  onYearChange: import_prop_types4.default.func,
  /**
   * The default visible view.
   * Used when the component view is not controlled.
   * Must be a valid option from `views` list.
   */
  openTo: import_prop_types4.default.oneOf(["day", "hours", "minutes", "month", "seconds", "year"]),
  /**
   * Force rendering in particular orientation.
   */
  orientation: import_prop_types4.default.oneOf(["landscape", "portrait"]),
  readOnly: import_prop_types4.default.bool,
  /**
   * If `true`, disable heavy animations.
   * @default `@media(prefers-reduced-motion: reduce)` || `navigator.userAgent` matches Android <10 or iOS <13
   */
  reduceAnimations: import_prop_types4.default.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid date-time using the validation props, except callbacks like `shouldDisable<...>`.
   */
  referenceDate: import_prop_types4.default.any,
  /**
   * Component displaying when passed `loading` true.
   * @returns {React.ReactNode} The node to render when loading.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: import_prop_types4.default.func,
  /**
   * Disable specific clock time.
   * @param {number} clockValue The value to check.
   * @param {TimeView} view The clock type of the timeValue.
   * @returns {boolean} If `true` the time will be disabled.
   * @deprecated Consider using `shouldDisableTime`.
   */
  shouldDisableClock: import_prop_types4.default.func,
  /**
   * Disable specific date.
   *
   * Warning: This function can be called multiple times (e.g. when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
   *
   * @template TDate
   * @param {TDate} day The date to test.
   * @returns {boolean} If `true` the date will be disabled.
   */
  shouldDisableDate: import_prop_types4.default.func,
  /**
   * Disable specific month.
   * @template TDate
   * @param {TDate} month The month to test.
   * @returns {boolean} If `true`, the month will be disabled.
   */
  shouldDisableMonth: import_prop_types4.default.func,
  /**
   * Disable specific time.
   * @template TDate
   * @param {TDate} value The value to check.
   * @param {TimeView} view The clock type of the timeValue.
   * @returns {boolean} If `true` the time will be disabled.
   */
  shouldDisableTime: import_prop_types4.default.func,
  /**
   * Disable specific year.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} If `true`, the year will be disabled.
   */
  shouldDisableYear: import_prop_types4.default.func,
  /**
   * If `true`, days outside the current month are rendered:
   *
   * - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
   *
   * - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
   *
   * - ignored if `calendars` equals more than `1` on range pickers.
   * @default false
   */
  showDaysOutsideCurrentMonth: import_prop_types4.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types4.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types4.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types4.default.oneOfType([import_prop_types4.default.arrayOf(import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object, import_prop_types4.default.bool])), import_prop_types4.default.func, import_prop_types4.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documention} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: import_prop_types4.default.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: import_prop_types4.default.any,
  /**
   * The visible view.
   * Used when the component view is controlled.
   * Must be a valid option from `views` list.
   */
  view: import_prop_types4.default.oneOf(["day", "hours", "minutes", "month", "seconds", "year"]),
  /**
   * Define custom view renderers for each section.
   * If `null`, the section will only have field editing.
   * If `undefined`, internally defined view will be the used.
   */
  viewRenderers: import_prop_types4.default.shape({
    day: import_prop_types4.default.func,
    hours: import_prop_types4.default.func,
    minutes: import_prop_types4.default.func,
    month: import_prop_types4.default.func,
    seconds: import_prop_types4.default.func,
    year: import_prop_types4.default.func
  }),
  /**
   * Available views.
   */
  views: import_prop_types4.default.arrayOf(import_prop_types4.default.oneOf(["day", "hours", "minutes", "month", "seconds", "year"]).isRequired),
  /**
   * Years rendered per row.
   * @default 3
   */
  yearsPerRow: import_prop_types4.default.oneOf([3, 4])
};
export {
  ArrowDropDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ClearIcon,
  ClockIcon,
  DEFAULT_DESKTOP_MODE_MEDIA_QUERY,
  DEFAULT_LOCALE,
  DateCalendar,
  DateField,
  DatePicker,
  DatePickerToolbar,
  DateRangeIcon,
  DateTimeField,
  DateTimePicker,
  DateTimePickerTabs,
  DateTimePickerToolbar,
  DayCalendarSkeleton,
  DesktopDatePicker,
  DesktopDateTimePicker,
  DesktopTimePicker,
  DigitalClock,
  LocalizationProvider,
  MobileDatePicker,
  MobileDateTimePicker,
  MobileTimePicker,
  MonthCalendar,
  MuiPickersAdapterContext,
  MultiSectionDigitalClock,
  PickersActionBar,
  PickersCalendarHeader,
  PickersDay,
  PickersLayout,
  PickersLayoutContentWrapper,
  PickersLayoutRoot,
  PickersShortcuts,
  StaticDatePicker,
  StaticDateTimePicker,
  StaticTimePicker,
  TimeClock,
  TimeField,
  TimeIcon,
  TimePicker,
  TimePickerToolbar,
  YearCalendar,
  beBY,
  caES,
  clockClasses,
  clockNumberClasses,
  clockPointerClasses,
  csCZ,
  daDK,
  dateCalendarClasses,
  datePickerToolbarClasses,
  dateTimePickerTabsClasses,
  dateTimePickerToolbarClasses,
  dayCalendarSkeletonClasses,
  dayPickerClasses,
  deDE,
  digitalClockClasses,
  elGR,
  enUS,
  esES,
  eu,
  faIR,
  fiFI,
  frFR,
  getDateCalendarUtilityClass,
  getDayCalendarSkeletonUtilityClass,
  getDigitalClockUtilityClass,
  getMonthCalendarUtilityClass,
  getMultiSectionDigitalClockUtilityClass,
  getPickersDayUtilityClass,
  getTimeClockUtilityClass,
  getYearCalendarUtilityClass,
  heIL,
  huHU,
  isIS,
  itIT,
  jaJP,
  koKR,
  kzKZ,
  mk,
  monthCalendarClasses,
  multiSectionDigitalClockClasses,
  multiSectionDigitalClockSectionClasses,
  nbNO,
  nlNL,
  pickersCalendarHeaderClasses,
  pickersDayClasses,
  pickersFadeTransitionGroupClasses,
  pickersLayoutClasses,
  pickersMonthClasses,
  pickersSlideTransitionClasses,
  pickersYearClasses,
  plPL,
  ptBR,
  renderDateViewCalendar,
  renderDigitalClockTimeView,
  renderMultiSectionDigitalClockTimeView,
  renderTimeViewClock,
  roRO,
  ruRU,
  skSK,
  svSE,
  timeClockClasses,
  timePickerToolbarClasses,
  trTR,
  ukUA,
  useDateField as unstable_useDateField,
  useDateTimeField as unstable_useDateTimeField,
  useTimeField as unstable_useTimeField,
  urPK,
  useClearableField,
  usePickerLayout_default as usePickerLayout,
  viVN,
  yearCalendarClasses,
  zhCN,
  zhHK
};
/*! Bundled license information:

@mui/x-date-pickers/index.js:
  (**
   * @mui/x-date-pickers v6.19.0
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=@mui_x-date-pickers.js.map
