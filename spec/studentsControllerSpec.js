describe('studentsController', () => {
  beforeEach(() => {
    this.studentController = new StudentController();
  });

  it('GET #new should handle request to the new student page', () => {
    var expectedResponse = `
1. 添加学生
2. 生成成绩单
请输入你的选择（1～2）：
    `;
    expect(this.studentController.new({})).toBe(expectedResponse);
  });

  it('POST #create should handle request to the create student page', () => {
  });

  it('GET #index should handle request to the students index page', () => {
  });
});
