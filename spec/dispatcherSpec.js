describe('dispatcher', () => {
  beforeEach(() => {
    var routes = {
      '/': 'home#root',
      '/home': 'home#index',
      '1': 'students#new',
      '/students': 'students#create',
      '2': 'students#index',
    };
    this.dispatcher = new Dispatcher(routes);
  });

  it('#dispatch should send request to the root page', () => {
    expect(this.dispatcher.dispatch('1')).toBe('students#new');
  });
});
