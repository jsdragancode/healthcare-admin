import { Modal } from '@material-ui/core';
import { createServer, Model, Factory } from 'miragejs';

createServer({
  models: {
    adminparam: Model,
    availabilityslot: Model,
    booking: Model,
    driver: Model,
    doctor: Model,
    consoleUser: Model,
    nurse: Model,
    van: Model,
    user: Model,
    userInterface: Model,
    userNotification: Model,
    labresult: Model,
    labtest: Model,
    faq: Model,
    consultation: Model,
    transaction: Model,
    patient: Model,
    location: Model,
    bookingHistory: Model,
  },
  factories: {
    adminparam: Factory.extend({
      param_key(i) {
        return `param key ${i}`;
      },
      param_name(i) {
        return `param name ${i}`;
      },
      param_value(i) {
        return `param value ${i}`;
      },
    }),
    availabilityslot: Factory.extend({
      day_id(i) {
        return parseInt(Math.random() * 1000);
      },
      start_time(i) {
        let start = new Date(2018, 0, 1);
        let end = new Date(2019, 0, 1);

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      },
      end_time() {
        let start = new Date(2018, 0, 1);
        let end = new Date(2019, 0, 1);

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      },
      number_of_concurrent_bookings() {
        return parseInt(Math.random() * 1000);
      },
    }),
    booking: Factory.extend({
      id(i) {
        return (i + 1);
      },
      user_id(i) {
        return (i + 1);
      },
      patient_id(i) {
        // return `patient ${i}`;
        return (i + 1);
      },
      start_datetime(i) {
        let start = new Date(2018, 0, 1);
        let end = new Date(2019, 0, 1);

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      },
      end_datetime(i) {
        let start = new Date(2019, 0, 1);
        let end = new Date(2020, 0, 1);

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      },
      booking_type(i) {
        return Math.random() > 0.5 ? 'General physician' : 'Laboratory test';
      },
      lap_test_id(i) {
        // return `lap test ${i}`;
        return (i + 1);
      },
      assigned_driver(i) {
        // return `driver ${i}`;
        return (i + 1);
      },
      assigned_van(i) {
        // return `van ${i}`;
        return (i + 1);
      },
      assigned_doctor(i) {
        // return `doctor ${i}`;
        return (i + 1);
      },
      assigned_nurse(i) {
        // return `nurse ${i}`;
        return (i + 1);
      },
      status(i) {
        let booking_status;

        if (Math.random() >= 0 && Math.random() < 0.15) {
          booking_status = 'Booking Placed';
        } else if (Math.random() >= 0.15 && Math.random() < 0.3) {
          booking_status = 'Team Assigned';
        } else if (Math.random() >= 0.3 && Math.random() < 0.45) {
          booking_status = 'Van Dispatched';
        } else if (Math.random() >= 0.45 && Math.random() < 0.6) {
          booking_status = 'Van Reached';
        } else if (Math.random() >= 0.6 && Math.random() < 0.75) {
          booking_status = 'Service Provided';
        } else if (Math.random() >= 0.75 && Math.random() < 0.85) {
          booking_status = 'Payment Failed';
        } else {
          booking_status = 'Booking Cancelled';
        }
        return booking_status;
      },
      payment_method(i) {
        let payment_methods;

        if (Math.random() >= 0 && Math.random() < 0.35) {
          payment_methods = 'VISA / Mastercard Credit Card';
        } else if (Math.random() >= 0.35 && Math.random() < 0.7) {
          payment_methods = 'Benefit Debit Card';
        } else {
          payment_methods = 'Insurance';
        }
        return payment_methods;
      },
      payment_url(i) {
        return `payment ${i}`;
      },
      placed_on(i) {
        let start = new Date(2018, 0, 1);
        let end = new Date(2019, 0, 1);

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      },
      location_coordinates(i) {
        return `location ${i}`;
      },
      location_address_line_1(i) {
        return `address_1 ${i}`;
      },
      location_address_line_2(i) {
        return `address_2 ${i}`;
      },
      location_city(i) {
        return `city ${i}`;
      },
      price(i) {
        return parseInt(Math.random() * 1000000);
      },
      vat(i) {
        return parseInt(Math.random() * 1000);
      },
      total_price(i) {
        return parseInt(Math.random() * 1000000);
      },
    }),
    driver: Factory.extend({
      full_name_en(i) {
        return `driver ${i}`;
      },
      full_name_ar(i) {
        return `سائق ${i}`;
      },
      mobile_number() {
        return parseInt(Math.random() * 1000000);
      },
      is_active() {
        return Math.random() > 0.5 ? 'Active' : 'In Active';
      },
    }),
    user: Factory.extend({
      full_name(i) {
        return `user ${i}`;
      },
      gender() {
        // 0 : male, 1 : female
        return Math.random() > 0.5 ? 'Male' : 'Female';
      },
      mobile_number() {
        return parseInt(Math.random() * 1000000);
      },
      default_location_coordinates(i) {
        return `coordinates ${i}`;
      },
      default_address_line_1(i) {
        return `address_1 ${i}`;
      },
      default_address_line_2(i) {
        return `address_2 ${i}`;
      },
      default_city(i) {
        return `city ${i}`;
      },
      is_active() {
        // 0 : in-active, 1 : active
        return Math.random() > 0.5 ? "Active" : "In Active";
      },
      firebase_uid(i) {
        return `firebase_uid ${i}`;
      },
      registered_on() {
        let start = new Date(2012, 0, 1);
        let end = new Date();

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      },
    }),
    userInterface: Factory.extend({
      user_id(i) {
        return parseInt(Math.random() * 100000);
      },
      instance_id(i) {
        return parseInt(Math.random() * 100000);
      },
      device_os(i) {
        return `device os ${i}`;
      },
      device_model(i) {
        return `device model ${i}`;
      },
    }),
    userNotification: Factory.extend({
      title(i) {
        return `title ${i}`;
      },
      message(i) {
        return `message ${i}`;
      },
      user_id(i) {
        return parseInt(Math.random() * 10000);
      },
      on_datetime(i) {
        let start = new Date(2012, 0, 1);
        let end = new Date();

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      },
      is_read(i) {
        return Math.random() > 0.5 ? 'Yes' : 'No';
      },
    }),
    doctor: Factory.extend({
      full_name_en(i) {
        return `doctor ${i}`;
      },
      full_name_ar(i) {
        return `طبيب ${i}`;
      },
      details_en(i) {
        return `details ${i}`;
      },
      details_ar(i) {
        return `تفاصيل ${i}`;
      },
      image_name(i) {
        return `Image Name ${i}`;
      },
      image_url(i) {
        return `../../assets/img/default-avatar.png`;
      },
      mobile_number() {
        return parseInt(Math.random() * 1000000);
      },
      team_order_no() {
        return parseInt(Math.random() * 1000);
      },
      is_active() {
        return Math.random() > 0.5 ? 'Active' : 'In Active';
      },
    }),
    consoleUser: Factory.extend({
      username(i) {
        return `user ${i}`;
      },
      password_hash(i) {
        return `password hash ${i}`;
      },
      role(i) {
        return `role ${i}`;
      },
      last_login(i) {
        let start = new Date(2018, 0, 1);
        let end = new Date(2019, 0, 1);

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      },
      last_failed_login(i) {
        let start = new Date(2018, 0, 1);
        let end = new Date(2019, 0, 1);

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      },
      consecutive_failed_logins_count() {
        return parseInt(Math.random() * 10);
      },
      doctor_id() {
        return parseInt(Math.random() * 100);
      },
    }),
    nurse: Factory.extend({
      full_name_en(i) {
        return `nurse ${i}`;
      },
      full_name_ar(i) {
        return `ممرضة ${i}`;
      },
      image_name(i) {
        return `Image Name ${i}`;
      },
      image_url(i) {
        return `../../assets/img/default-avatar.png`;
      },
      mobile_number() {
        return parseInt(Math.random() * 1000000);
      },
      team_order_no() {
        return parseInt(Math.random() * 1000);
      },
      is_active() {
        return Math.random() > 0.5 ? 'Active' : 'In Active';
      },
    }),
    van: Factory.extend({
      title(i) {
        return `van ${i}`;
      },
      is_deleted() {
        return Math.random() > 0.5 ? 'Yes' : 'No';
      },
    }),
    labresult: Factory.extend({
      id(i) {
        return (i + 1);
      },
      booking_id(i) {
        return (i + 1);
      },
      line_name_en(i) {
        return `Name ${i}`;
      },
      line_name_ar(i) {
        return `سائق ${i}`;
      },
      result(i) {
        return `result ${i}`;
      }
    }),
    labtest: Factory.extend({
      test_name_ar(i) {
        return `Aame ar ${i}`;
      },
      test_name_en(i) {
        return `Name en ${i}`;
      },
      test_short_desc_ar(i) {
        return `Desc ar ${i}`;
      },
      test_short_desc_en(i) {
        return `Desc en ${i}`;
      },
      is_available(i) {
        return Math.random() > 0.5 ? 'Yes' : 'No';
      },
      image_name(i) {
        return `Image Name ${i}`;
      },
      image_url(i) {
        return `../../assets/img/default-avatar.png`;
      },
      price(i) {
        return `Price ${i}`;
      }
    }),
    faq: Factory.extend({
      question_en(i) {
        return `Question ${i}`;
      },
      question_ar(i) {
        return `سؤال ${i}`;
      },
      answer_en(i) {
        return `Answer ${i}`;
      },
      answer_ar(i) {
        return `إجابة ${i}`;
      },
      order_no(i) {
        return `Order ${i}`;
      }
    }),
    consultation: Factory.extend({
      booking_id(i) {
        return `booking ${i}`;
      },
      examination(i) {
        return `Examination ${i}`;
      },
      diagnosis(i) {
        return `Diagnosis ${i}`;
      },
      follow_up(i) {
        return `Follow Up ${i}`;
      },
      medication(i) {
        return `Medication ${i}`;
      },
      body_temp(i) {
        return `Body Temp ${i}`;
      },
      pulse_rate(i) {
        return `Pulse ${i}`;
      },
      respiration_rate(i) {
        return `Respiration ${i}`;
      },
      blood_pressure(i) {
        return parseInt(Math.random() * 1000);
      },
      weight(i) {
        return `Weight ${i}`;
      },
      height(i) {
        return `height ${i}`;
      },
    }),
    transaction: Factory.extend({
      id(i) {
        return (i + 1);
      },
      booking_id(i) {
        return (i + 1);
      },
      charge_id(i) {
        return `Charge ${i}`;
      },
      track_code(i) {
        return parseInt(Math.random() * 1000000);
      },
      payment_code(i) {
        return parseInt(Math.random() * 1000000);
      },
      gateway_code(i) {
        return parseInt(Math.random() * 1000000);
      },
      transaction_code(i) {
        return parseInt(Math.random() * 1000000);
      },
      order_code(i) {
        return parseInt(Math.random() * 1000000);
      },
      secret_hash(i) {
        return parseInt(Math.random() * 10000000);
      },
      result_text(i) {
        return `Result ${i}`;
      },
      is_success(i) {
        return Math.random() > 0.5 ? 'Yes' : 'No';
      },
      created_on(i) {
        let start = new Date(2012, 0, 1);
        let end = new Date();

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      },
    }),

    patient: Factory.extend({
      full_name(i) {
        return `Name ${i}`;
      },
      gender(i) {
        return Math.random() > 0.5 ? 'Male' : 'Female';
      },
      date_of_birth(i) {
        let start = new Date(1940, 0, 1);
        let end = new Date();

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      },
      cpr_number(i) {
        return `CPR Number ${i}`;
      },
      scanned_cpr_front(i) {
        return `CPR Front ${i}`;
      },
      scanned_cpr_front_url(i) {
        return `CPR Front ${i}`;
      },
      scanned_cpr_back(i) {
        return `CPR Back ${i}`;
      },
      scanned_cpr_back_url(i) {
        return `CPR Back ${i}`;
      },
      scanned_insurance_front(i) {
        return `Insurance Front ${i}`;
      },
      scanned_insurance_front_url(i) {
        return `Insurance Front ${i}`;
      },
      scanned_insurance_back(i) {
        return `Insurance Back ${i}`;
      },
      scanned_insurance_back_url(i) {
        return `Insurance Back ${i}`;
      },
      user_id(i) {
        return parseInt(Math.random() * 1000000);
      },
      is_user_main(i) {
        return Math.random() > '0.5' ? 'Yes' : 'No';
      },
      is_deleted(i) {
        return Math.random() > 0.5 ? 'Yes' : 'No';
      },
    }),

    location: Factory.extend({
      booking_id(i) {
        return `booking ${i}`;
      },
      location_coordinates(i) {
        return `Location ${i}`;
      },
      on_datetime(i) {
        let start = new Date(2019, 0, 1);
        let end = new Date();

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      }
    }),

    bookingHistory: Factory.extend({
      id(i) {
        return (i + 1);
      },
      booking_id(i) {
        return (i + 1);
      },
      status(i) {
        let booking_status;

        if (Math.random() >= 0 && Math.random() < 0.15) {
          booking_status = 'Booking Placed';
        } else if (Math.random() >= 0.15 && Math.random() < 0.3) {
          booking_status = 'Team Assigned';
        } else if (Math.random() >= 0.3 && Math.random() < 0.45) {
          booking_status = 'Van Dispatched';
        } else if (Math.random() >= 0.45 && Math.random() < 0.6) {
          booking_status = 'Van Reached';
        } else if (Math.random() >= 0.6 && Math.random() < 0.75) {
          booking_status = 'Service Provided';
        } else if (Math.random() >= 0.75 && Math.random() < 0.85) {
          booking_status = 'Payment Failed';
        } else {
          booking_status = 'Booking Cancelled';
        }
        return booking_status;
      },
      on_datetime(i) {
        let start = new Date(2019, 0, 1);
        let end = new Date();

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      }
    }),
  },
  routes() {
    this.logging = false;
    this.namespace = 'api';

    this.get('/adminparams/', (schema) => {
      return schema.adminparams.all();
    });

    this.post('/adminparams/', (schema, request) => {
      let newBook = JSON.parse(request.requestBody);

      return schema.adminparams.create(newBook);
    });

    this.delete('/adminparams/:id', (schema, request) => {
      let id = request.params.id;

      return schema.adminparams.find(id).destroy();
    });

    this.patch('/adminparams/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let book = schema.adminparams.find(id);

      return book.update(newAttrs);
    });

    this.get('/availabilityslots/', (schema) => {
      return schema.availabilityslots.all();
    });

    this.post('/availabilityslots/', (schema, request) => {
      let newBook = JSON.parse(request.requestBody);

      return schema.availabilityslots.create(newBook);
    });

    this.delete('/availabilityslots/:id', (schema, request) => {
      let id = request.params.id;

      return schema.availabilityslots.find(id).destroy();
    });

    this.patch('/availabilityslots/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let book = schema.availabilityslots.find(id);

      return book.update(newAttrs);
    });

    this.get('/bookings/', (schema) => {
      return schema.bookings.all();
    });

    this.post('/bookings/', (schema, request) => {
      let newBook = JSON.parse(request.requestBody);

      return schema.bookings.create(newBook);
    });

    this.delete('/bookings/:id', (schema, request) => {
      let id = request.params.id;

      return schema.bookings.find(id).destroy();
    });

    this.patch('/bookings/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let book = schema.bookings.find(id);

      return book.update(newAttrs);
    });

    this.get('/drivers/', (schema) => {
      return schema.drivers.all();
    });

    this.post('/drivers/', (schema, request) => {
      let newDriver = JSON.parse(request.requestBody);

      return schema.drivers.create(newDriver);
    });

    this.delete('/drivers/:id', (schema, request) => {
      let id = request.params.id;

      return schema.drivers.find(id).destroy();
    });

    this.patch('/drivers/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let driver = schema.drivers.find(id);

      return driver.update(newAttrs);
    });

    this.get('/doctors/', (schema) => {
      return schema.doctors.all();
    });

    this.post('/doctors/', (schema, request) => {
      let newDoctor = JSON.parse(request.requestBody);

      return schema.doctors.create(newDoctor);
    });

    this.delete('/doctors/:id', (schema, request) => {
      let id = request.params.id;

      return schema.doctors.find(id).destroy();
    });

    this.patch('/doctors/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let doctor = schema.doctors.find(id);

      return doctor.update(newAttrs);
    });

    this.get('/consoleUsers/', (schema) => {
      return schema.consoleUsers.all();
    });

    this.post('/consoleUsers/', (schema, request) => {
      let newDoctor = JSON.parse(request.requestBody);

      return schema.consoleUsers.create(newDoctor);
    });

    this.delete('/consoleUsers/:id', (schema, request) => {
      let id = request.params.id;

      return schema.consoleUsers.find(id).destroy();
    });

    this.patch('/consoleUsers/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let doctor = schema.consoleUsers.find(id);

      return doctor.update(newAttrs);
    });

    this.get('/nurses/', (schema) => {
      return schema.nurses.all();
    });

    this.post('/nurses/', (schema, request) => {
      let newNurse = JSON.parse(request.requestBody);

      return schema.nurses.create(newNurse);
    });

    this.delete('/nurses/:id', (schema, request) => {
      let id = request.params.id;

      return schema.nurses.find(id).destroy();
    });

    this.patch('/nurses/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let nurse = schema.nurses.find(id);

      return nurse.update(newAttrs);
    });

    this.get('/vans/', (schema) => {
      return schema.vans.all();
    });

    this.post('/vans/', (schema, request) => {
      let newVan = JSON.parse(request.requestBody);

      return schema.vans.create(newVan);
    });

    this.delete('/vans/:id', (schema, request) => {
      let id = request.params.id;

      return schema.vans.find(id).destroy();
    });

    this.patch('/vans/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let van = schema.vans.find(id);

      return van.update(newAttrs);
    });

    this.get('/users/', (schema) => {
      return schema.users.all();
    });

    this.post('/users/', (schema, request) => {
      let newUser = JSON.parse(request.requestBody);

      return schema.users.create(newUser);
    });

    this.delete('/users/:id', (schema, request) => {
      let id = request.params.id;

      return schema.users.find(id).destroy();
    });

    this.patch('/users/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let user = schema.users.find(id);

      return user.update(newAttrs);
    });

    this.get('/userInterfaces/', (schema) => {
      return schema.userInterfaces.all();
    });

    this.post('/userInterfaces/', (schema, request) => {
      let newUser = JSON.parse(request.requestBody);

      return schema.userInterfaces.create(newUser);
    });

    this.delete('/userInterfaces/:id', (schema, request) => {
      let id = request.params.id;

      return schema.userInterfaces.find(id).destroy();
    });

    this.patch('/userInterfaces/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let user = schema.userInterfaces.find(id);

      return user.update(newAttrs);
    });

    this.get('/userNotifications/', (schema) => {
      return schema.userNotifications.all();
    });

    this.post('/userNotifications/', (schema, request) => {
      let newUser = JSON.parse(request.requestBody);

      return schema.userNotifications.create(newUser);
    });

    this.delete('/userNotifications/:id', (schema, request) => {
      let id = request.params.id;

      return schema.userNotifications.find(id).destroy();
    });

    this.patch('/userNotifications/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let user = schema.userNotifications.find(id);

      return user.update(newAttrs);
    });

    this.get('/labresults/', (schema) => {
      return schema.labresults.all();
    });

    this.post('/labresults/', (schema, request) => {
      let newLab = JSON.parse(request.requestBody);

      return schema.labresults.create(newLab);
    });

    this.delete('/labresults/:id', (schema, request) => {
      let id = request.params.id;

      return schema.labresults.find(id).destroy();
    });

    this.patch('/labresults/:id', (schema, request) => {
      let newLabs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let lab = schema.labresults.find(id);

      return lab.update(newLabs);
    });

    this.get('/labtests/', (schema) => {
      return schema.labtests.all();
    });

    this.post('/labtests/', (schema, request) => {
      let newLab = JSON.parse(request.requestBody);

      return schema.labtests.create(newLab);
    });

    this.delete('/labtests/:id', (schema, request) => {
      let id = request.params.id;

      return schema.labtests.find(id).destroy();
    });

    this.patch('/labtests/:id', (schema, request) => {
      let newLabs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let lab = schema.labtests.find(id);

      return lab.update(newLabs);
    });

    this.get('/faqs/', (schema) => {
      return schema.faqs.all();
    });

    this.post('/faqs/', (schema, request) => {
      let newFaq = JSON.parse(request.requestBody);

      return schema.faqs.create(newFaq);
    });

    this.delete('/faqs/:id', (schema, request) => {
      let id = request.params.id;

      return schema.faqs.find(id).destroy();
    });

    this.patch('/faqs/:id', (schema, request) => {
      let newFaq = JSON.parse(request.requestBody);
      let id = request.params.id;
      let lab = schema.faqs.find(id);

      return lab.update(newFaq);
    });

    this.get('/consultations/', (schema) => {
      return schema.consultations.all();
    });

    this.post('/consultations/', (schema, request) => {
      let newCons = JSON.parse(request.requestBody);

      return schema.consultations.create(newCons);
    });

    this.delete('/consultations/:id', (schema, request) => {
      let id = request.params.id;

      return schema.consultations.find(id).destroy();
    });

    this.patch('/consultations/:id', (schema, request) => {
      let newCons = JSON.parse(request.requestBody);
      let id = request.params.id;
      let lab = schema.consultations.find(id);

      return lab.update(newCons);
    });

    this.get('/transactions/', (schema) => {
      return schema.transactions.all();
    });

    this.get('/transactions/:id', (schema, request) => {
      let id = request.params.id;
      return schema.transactions.find(id);
    });

    this.post('/transactions/', (schema, request) => {
      let newCons = JSON.parse(request.requestBody);

      return schema.transactions.create(newCons);
    });

    this.delete('/transactions/:id', (schema, request) => {
      let id = request.params.id;

      return schema.transactions.find(id).destroy();
    });

    this.patch('/transactions/:id', (schema, request) => {
      let newCons = JSON.parse(request.requestBody);
      let id = request.params.id;
      let lab = schema.transactions.find(id);

      return lab.update(newCons);
    });

    this.get('/patients/', (schema) => {
      return schema.patients.all();
    });

    this.post('/patients/', (schema, request) => {
      let newCons = JSON.parse(request.requestBody);

      return schema.patients.create(newCons);
    });

    this.delete('/patients/:id', (schema, request) => {
      let id = request.params.id;

      return schema.patients.find(id).destroy();
    });

    this.patch('/patients/:id', (schema, request) => {
      let newCons = JSON.parse(request.requestBody);
      let id = request.params.id;
      let lab = schema.patients.find(id);

      return lab.update(newCons);
    });

    this.get('/locations/', (schema) => {
      return schema.locations.all();
    });

    this.post('/locations/', (schema, request) => {
      let newBook = JSON.parse(request.requestBody);

      return schema.locations.create(newBook);
    });

    this.delete('/locations/:id', (schema, request) => {
      let id = request.params.id;

      return schema.locations.find(id).destroy();
    });

    this.patch('/locations/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let book = schema.locations.find(id);

      return book.update(newAttrs);
    });

    this.get('/bookingHistories/', (schema) => {
      return schema.bookingHistories.all();
    });

    this.get('/bookingHistories/:id', (schema, request) => {
      let id = request.params.id;
      return schema.bookingHistories.find(id);
    });

    this.post('/bookingHistories/', (schema, request) => {
      let newBook = JSON.parse(request.requestBody);

      return schema.bookingHistories.create(newBook);
    });

    this.delete('/bookingHistories/:id', (schema, request) => {
      let id = request.params.id;

      return schema.bookingHistories.find(id).destroy();
    });

    this.patch('/bookingHistories/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let book = schema.bookingHistories.find(id);

      return book.update(newAttrs);
    });

    this.post('/logins/', (schema, request) => {
      let loginInfo = JSON.parse(request.requestBody);
      if (loginInfo.email === 'admin@test.com' && loginInfo.password === 'admin123') {
        return {
          token: 'admin_token',
          user: {
            role: 'admin'
          }
        };
      } else if (loginInfo.email === 'doctor@test.com' && loginInfo.password === 'doctor123') {
        return {
          token: 'doctor_token',
          user: {
            role: 'doctor'
          }
        };
      } else {
        return {
          token: 'failed',
          user: {
            role: 'failed'
          }
        };
      }
    });
  },
  seeds(server) {
    server.createList('adminparam', 40);
    server.createList('availabilityslot', 40);
    server.createList('booking', 40);
    server.createList('driver', 40);
    server.createList('doctor', 40);
    server.createList('consoleUser', 40);
    server.createList('nurse', 40);
    server.createList('van', 40);
    server.createList('user', 40);
    server.createList('userInterface', 40);
    server.createList('userNotification', 40);
    server.createList('labresult', 40);
    server.createList('labtest', 40);
    server.createList('faq', 40);
    server.createList('consultation', 40);
    server.createList('transaction', 40);
    server.createList('patient', 40);
    server.createList('location', 40);
    server.createList('bookingHistory', 40);
  },
});
