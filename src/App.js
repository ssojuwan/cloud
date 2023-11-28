import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    grade: '',
    feedback: '',
    selectedOptions: [],
  });

  const [grades, setGrades] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // 학년 데이터 가져오기 (DynamoDB 또는 다른 데이터 소스에서 가져옴)
    const dummyGrades = ['1학년', '2학년', '3학년', '4학년'];
    setGrades(dummyGrades);

    // 학과 데이터 가져오기 (DynamoDB 또는 다른 데이터 소스에서 가져옴)
    const dummyDepartments = [
      '스마트소프트웨어학과',
      '전기전자공학과',
      '스마트전기전자공학과',
      '기계공학과',
      '스마트기계공학과',
    ];
    setDepartments(dummyDepartments);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updatedOptions = checked
        ? [...formData.selectedOptions, value]
        : formData.selectedOptions.filter((option) => option !== value);

      setFormData({ ...formData, selectedOptions: updatedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    // 필수 입력 필드가 비어있을 경우
    if (
      formData.name === '' ||
      formData.department === '' ||
      formData.grade === '' ||
      formData.selectedOptions.length === 0 ||
      formData.feedback === ''
    ) {
      alert('모든 필수 항목을 입력하세요.');
    } else {
      // 모든 필수 입력 필드가 채워져 있을 경우, 여기에 DB에 데이터를 전송하는 로직을 추가할 수 있습니다.
      // 아래는 간단한 확인용 alert입니다.
      alert('제출했습니다.');
    }
  };

  return (
    <div>
      <h1>간단한 설문조사</h1>
      <form>
        <label htmlFor="name">이름:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br />

        <label htmlFor="department">학과:</label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">선택하세요</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select><br />

        <label htmlFor="grade">학년:</label>
        <select
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          required
        >
          <option value="">선택하세요</option>
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select><br />

        <hr />

        <label>1.</label>

        <label htmlFor="feedback">의견을 공유해주세요:</label>
        <br />
        <textarea
          id="feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          rows="4"
          cols="50"
          required
        ></textarea><br />

        <button type="button" onClick={handleSubmit}>
          제출
        </button>
      </form>
    </div>
  );
};

export default App;
