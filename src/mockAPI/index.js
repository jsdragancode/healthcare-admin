import { Modal } from '@material-ui/core';
import { createServer, Model, Factory } from 'miragejs';

createServer({
  models: {
    acceptedPatient: Model,
    currentServed: Model,
    bokingCompleted: Model,
    waitingPatients: Model,
    adminparam: Model,
    availabilityslot: Model,
    booking: Model,
    driver: Model,
    doctor: Model,
    consoleUser: Model,
    nurse: Model,
    van: Model,
    user: Model,
    userInstance: Model,
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
    waitingPatient: Factory.extend({
      name(i) {
        return `Full Name${i + 1}`;
      },
      gender(i) {
        return Math.random() > 0.5 ? 'Male' : 'Female';
      },
      mobile_number(i) {
        return parseInt(Math.random() * 1000000);
      },
      waiting_dates(i) {
        return parseInt(Math.random() * 100);
      }
    }),
    adminparam: Factory.extend({
      param_key(i) {
        return `param key ${i + 1}`;
      },
      param_name(i) {
        return `param name ${i + 1}`;
      },
      param_value(i) {
        return `param value ${i + 1}`;
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
        // return `patient ${i + 1}`;
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
      lab_test_id(i) {
        // return `lap test ${i + 1}`;
        return (i + 1);
      },
      assigned_driver(i) {
        // return `driver ${i + 1}`;
        return (i + 1);
      },
      assigned_van(i) {
        // return `van ${i + 1}`;
        return (i + 1);
      },
      assigned_doctor(i) {
        // return `doctor ${i + 1}`;
        return (i + 1);
      },
      assigned_nurse(i) {
        // return `nurse ${i + 1}`;
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
        return `payment ${i + 1}`;
      },
      placed_on(i) {
        let start = new Date(2018, 0, 1);
        let end = new Date(2019, 0, 1);

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      },
      location_coordinates(i) {
        return `location ${i + 1}`;
      },
      location_address_line_1(i) {
        return `address_1 ${i + 1}`;
      },
      location_address_line_2(i) {
        return `address_2 ${i + 1}`;
      },
      location_city(i) {
        return `city ${i + 1}`;
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
      id(i) {
        return (i + 1);
      },
      full_name_en(i) {
        return `driver ${i + 1}`;
      },
      full_name_ar(i) {
        return `سائق ${i + 1}`;
      },
      mobile_number() {
        return parseInt(Math.random() * 1000000);
      },
      is_active() {
        return Math.random() > 0.5 ? 'Active' : 'In Active';
      },
    }),
    user: Factory.extend({
      id(i) {
        return (i + 1);
      },
      full_name(i) {
        return `user ${i + 1}`;
      },
      gender() {
        // 0 : male, 1 : female
        return Math.random() > 0.5 ? 'Male' : 'Female';
      },
      mobile_number() {
        return parseInt(Math.random() * 1000000);
      },
      default_location_coordinates(i) {
        return `coordinates ${i + 1}`;
      },
      default_address_line_1(i) {
        return `address_1 ${i + 1}`;
      },
      default_address_line_2(i) {
        return `address_2 ${i + 1}`;
      },
      default_city(i) {
        return `city ${i + 1}`;
      },
      is_active() {
        // 0 : in-active, 1 : active
        return Math.random() > 0.5 ? "Active" : "In Active";
      },
      firebase_uid(i) {
        return `firebase_uid ${i + 1}`;
      },
      registered_on() {
        let start = new Date(2012, 0, 1);
        let end = new Date();

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      },
    }),
    userInstance: Factory.extend({
      id(i) {
        return (i + 1);
      },
      user_id(i) {
        return (i + 1);
      },
      instance_id(i) {
        return (i + 1);
      },
      device_os(i) {
        return `device os ${i + 1}`;
      },
      device_model(i) {
        return `device model ${i + 1}`;
      },
    }),
    userNotification: Factory.extend({
      id(i) {
        return (i + 1);
      },
      title(i) {
        return `title ${i + 1}`;
      },
      message(i) {
        return `message ${i + 1}`;
      },
      user_id(i) {
        return `title ${i + 1}`;
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
      id(i) {
        return (i + 1);
      },
      full_name_en(i) {
        return `doctor ${i + 1}`;
      },
      full_name_ar(i) {
        return `طبيب ${i + 1}`;
      },
      details_en(i) {
        return `details ${i + 1}`;
      },
      details_ar(i) {
        return `تفاصيل ${i + 1}`;
      },
      image_name(i) {
        return `Image Name ${i + 1}`;
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
      id(i) {
        return (i + 1);
      },
      username(i) {
        return `user ${i + 1}`;
      },
      password_hash(i) {
        return `password hash ${i + 1}`;
      },
      role(i) {
        return `role ${i + 1}`;
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
      id(i) {
        return (i + 1);
      },
      full_name_en(i) {
        return `nurse ${i + 1}`;
      },
      full_name_ar(i) {
        return `ممرضة ${i + 1}`;
      },
      image_name(i) {
        return `Image Name ${i + 1}`;
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
        return `van ${i + 1}`;
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
        return `Name ${i + 1}`;
      },
      line_name_ar(i) {
        return `سائق ${i + 1}`;
      },
      result(i) {
        return `result ${i + 1}`;
      }
    }),
    labtest: Factory.extend({
      id(i) {
        return (i + 1);
      },
      test_name_ar(i) {
        return `Aame ar ${i + 1}`;
      },
      test_name_en(i) {
        return `Name en ${i + 1}`;
      },
      test_short_desc_ar(i) {
        return `Desc ar ${i + 1}`;
      },
      test_short_desc_en(i) {
        return `Desc en ${i + 1}`;
      },
      is_available(i) {
        return Math.random() > 0.5 ? 'Yes' : 'No';
      },
      image_name(i) {
        return `Image Name ${i + 1}`;
      },
      image_url(i) {
        return `../../assets/img/default-avatar.png`;
      },
      price(i) {
        return `Price ${i + 1}`;
      }
    }),
    faq: Factory.extend({
      question_en(i) {
        return `Question ${i + 1}`;
      },
      question_ar(i) {
        return `سؤال ${i + 1}`;
      },
      answer_en(i) {
        return `Answer ${i + 1}`;
      },
      answer_ar(i) {
        return `إجابة ${i + 1}`;
      },
      order_no(i) {
        return `Order ${i + 1}`;
      }
    }),
    consultation: Factory.extend({
      id(i) {
        return (i + 1);
      },
      booking_id(i) {
        return (i + 1);
      },
      examination(i) {
        return `Examination ${i + 1}`;
      },
      diagnosis(i) {
        return `Diagnosis ${i + 1}`;
      },
      follow_up(i) {
        return `Follow Up ${i + 1}`;
      },
      medication(i) {
        return `Medication ${i + 1}`;
      },
      body_temp(i) {
        return `Body Temp ${i + 1}`;
      },
      pulse_rate(i) {
        return `Pulse ${i + 1}`;
      },
      respiration_rate(i) {
        return `Respiration ${i + 1}`;
      },
      blood_pressure(i) {
        return parseInt(Math.random() * 1000);
      },
      weight(i) {
        return `Weight ${i + 1}`;
      },
      height(i) {
        return `height ${i + 1}`;
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
        return `Charge ${i + 1}`;
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
        return `Result ${i + 1}`;
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
      id(i) {
        return (i + 1);
      },
      full_name(i) {
        return `Name ${i + 1}`;
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
        return `CPR Number ${i + 1}`;
      },
      scanned_cpr_front(i) {
        return `CPR Front ${i + 1}`;
      },
      scanned_cpr_front_url(i) {
        return `CPR Front ${i + 1}`;
      },
      scanned_cpr_back(i) {
        return `CPR Back ${i + 1}`;
      },
      scanned_cpr_back_url(i) {
        return `CPR Back ${i + 1}`;
      },
      scanned_insurance_front(i) {
        return `Insurance Front ${i + 1}`;
      },
      scanned_insurance_front_url(i) {
        return `Insurance Front ${i + 1}`;
      },
      scanned_insurance_back(i) {
        return `Insurance Back ${i + 1}`;
      },
      scanned_insurance_back_url(i) {
        return `Insurance Back ${i + 1}`;
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
      id(i) {
        return (i + 1);
      },
      booking_id(i) {
        return (i + 1);
      },
      location_coordinates(i) {
        return `Location ${i + 1}`;
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

    this.get('/acceptedPatient/', (schema) => {
      return 25;
    });

    this.get('/currentServed/', (schema) => {
      return 19;
    });

    this.get('/bokingCompleted/', (schema) => {
      return 245;
    });

    this.get('/waitingPatients/', (schema) => {
      // return schema.waitingPatients.all();
      return 4;
    });


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

    this.get('/drivers/:id', (schema, request) => {
      let id = request.params.id;
      return schema.drivers.find(id);
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

    this.get('/doctors/:id', (schema, request) => {
      let id = request.params.id;
      return schema.doctors.find(id);
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

    this.get('/consoleUsers/:id', (schema, request) => {
      let id = request.params.id;
      return schema.consoleUsers.find(id);
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

    this.get('/nurses/:id', (schema, request) => {
      let id = request.params.id;
      return schema.nurses.find(id);
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

    this.get('/vans/:id', (schema, request) => {
      let id = request.params.id;
      return schema.vans.find(id);
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

    this.get('/users/:id', (schema, request) => {
      let id = request.params.id;
      return schema.users.find(id);
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

    this.get('/userInstances/', (schema) => {
      return schema.userInstances.all();
    });

    this.get('/userInstances/:id', (schema, request) => {
      let id = request.params.id;
      return schema.userInstances.find(id);
    });

    this.post('/userInstances/', (schema, request) => {
      let newUser = JSON.parse(request.requestBody);

      return schema.userInstances.create(newUser);
    });

    this.delete('/userInstances/:id', (schema, request) => {
      let id = request.params.id;

      return schema.userInstances.find(id).destroy();
    });

    this.patch('/userInstances/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let user = schema.userInstances.find(id);

      return user.update(newAttrs);
    });

    this.get('/userNotifications/', (schema) => {
      return schema.userNotifications.all();
    });

    this.get('/userNotifications/:id', (schema, request) => {
      let id = request.params.id;
      return schema.userNotifications.find(id);
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

    this.get('/labresults/:id', (schema, request) => {
      let id = request.params.id;
      return schema.labresults.find(id);
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

    this.get('/labtests/:id', (schema, request) => {
      let id = request.params.id;
      return schema.labtests.find(id);
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

    this.get('/consultations/:id', (schema, request) => {
      let id = request.params.id;

      return schema.consultations.find(id);
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

    this.get('/patients/:id', (schema, request) => {
      let id = request.params.id;
      return schema.patients.find(id);
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

    this.get('/locations/:id', (schema, request) => {
      let id = request.params.id;
      return schema.locations.find(id);
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
    server.createList('waitingPatient', 15);
    server.createList('adminparam', 40);
    server.createList('availabilityslot', 40);
    server.createList('booking', 40);
    server.createList('driver', 40);
    server.createList('doctor', 40);
    server.createList('consoleUser', 40);
    server.createList('nurse', 40);
    server.createList('van', 40);
    server.createList('user', 40);
    server.createList('userInstance', 40);
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
