import { Modal } from '@material-ui/core';
import { createServer, Model, Factory } from 'miragejs';

createServer({
  models: {
    driver: Model,
    user: Model,
    doctor: Model,
    nurse: Model,
    van: Model,
    labresult: Model,
    faq: Model,
    consultation: Model,
    transaction: Model,
  },
  factories: {
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
    }),
    user: Factory.extend({
      full_name(i) {
        return `user ${i}`;
      },
      gender() {
        // 0 : male, 1 : female
        return Math.random() > 0.5 ? 1 : 0;
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
        return Math.random() > 0.5 ? 1 : 0;
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
      image_url(i) {
        return `doctor_image ${i}`;
      },
      mobile_number() {
        return parseInt(Math.random() * 1000000);
      },
      team_order_no() {
        return parseInt(Math.random() * 1000);
      },
      is_active() {
        // 0 : in-active, 1 : active
        return Math.random() > 0.5 ? 1 : 0;
      },
    }),
    nurse: Factory.extend({
      full_name_en(i) {
        return `nurse ${i}`;
      },
      full_name_ar(i) {
        return `ممرضة ${i}`;
      },
      image_url(i) {
        return `nurse_image ${i}`;
      },
      mobile_number() {
        return parseInt(Math.random() * 1000000);
      },
      team_order_no() {
        return parseInt(Math.random() * 1000);
      },
      is_active() {
        // 0 : in-active, 1 : active
        return Math.random() > 0.5 ? 1 : 0;
      },
    }),
    van: Factory.extend({
      title(i) {
        return `van ${i}`;
      },
      is_deleted() {
        // 0 : not-deleted, 1 : deleted
        return Math.random() > 0.5 ? 1 : 0;
      },
    }),
    labresult: Factory.extend({
      booking_id(i) {
        return `booking ${i}`;
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
      booking_id(i) {
        return `Booking Id ${i}`;
      },
      charge_id(i) {
        return `Charge Id ${i}`;
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
        return Math.random() > 0.5 ? 1 : 0;
      },
      created_on(i) {
        let start = new Date(2012, 0, 1);
        let end = new Date();

        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      },
    }),
  },
  routes() {
    this.logging = false;
    this.namespace = 'api';

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

  },
  seeds(server) {
    server.createList('driver', 40);
    server.createList('user', 40);
    server.createList('doctor', 40);
    server.createList('nurse', 40);
    server.createList('van', 40);
    server.createList('labresult', 40);
    server.createList('faq', 40);
    server.createList('consultation', 40);
    server.createList('transaction', 40);
  },
});
