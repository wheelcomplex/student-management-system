describe('homeController', () => {
  beforeEach(() => {
    this.homeController = new HomeController();
  });

  it('GET #root should handle request to the home root page', () => {
    var expectedResponse = `
1. 添加学生
2. 生成成绩单
请输入你的选择（1～2）：
    `;
    expect(this.homeController.root({})).toBe(expectedResponse);
  });

  it('GET #index should handle request to the home index page', () => {
    var expectedResponse = `
1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：
    `;
    expect(this.homeController.index({})).toBe(expectedResponse);
  });
});
