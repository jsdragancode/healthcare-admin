import { createServer, Model, Factory } from 'miragejs';

createServer({
  models: {
    driver: Model,
    user: Model,
  },
  factories: {
    driver: Factory.extend({
      full_name_en(i) {
        return `full_name_en ${i}`;
      },
      full_name_ar(i) {
        return `full_name_ar ${i}`;
      },
      mobile_number(i) {
        return `mobile_number ${i}`;
      },
    }),
    user: Factory.extend({
      full_name(i) {
        return `full_name ${i}`;
      },
      gender(i) {
        return `gender ${i}`;
      },
      mobile_number(i) {
        return `mobile_number ${i}`;
      },
      default_location_coordinates(i) {
        return `default_location_coordinates ${i}`;
      },
      default_address_line_1(i) {
        return `default_address_line_1 ${i}`;
      },
      default_address_line_2(i) {
        return `default_address_line_2 ${i}`;
      },
      default_city(i) {
        return `default_city ${i}`;
      },
      is_active(i) {
        return `is_active ${i}`;
      },
      firebase_uid(i) {
        return `firebase_uid ${i}`;
      },
      registered_on(i) {
        return `registered_on ${i}`;
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
  },
  seeds(server) {
    server.createList('driver', 40);
    server.createList('user', 40);
    // server.db.loadData({
    //   drivers: [
    //     {
    //       full_name_en: 'AAA',
    //       full_name_ar: '111',
    //       mobile_number: '123',
    //     },
    //     {
    //       full_name_en: 'BBB',
    //       full_name_ar: '222',
    //       mobile_number: '456',
    //     },
    //     {
    //       full_name_en: 'CCC',
    //       full_name_ar: '333',
    //       mobile_number: '789',
    //     },
    //   ],
    // });
  },
});
