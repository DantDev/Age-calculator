import React from 'react'
import arrowIcon from "./assets/images/icon-arrow.svg"

function App() {
  const [birthday, setBirthday] = React.useState('');
  const [birthmonth, setBirthMonth] = React.useState('');
  const [birthyear, setBirthYear] = React.useState('');
  const [age, setAge] = React.useState({ years: 0, months: 0, days: 0 });
  const [emptyDay , setEmptyDay] = React.useState(false)
  const [emptyMonth , setEmptyMonth] = React.useState(false)
  const [emptyYear , setEmptyYear] = React.useState(false)

  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(`${birthyear}-${birthmonth}-${birthday}`);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const prevMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        0
      );
      days += prevMonth.getDate();
      months--;
    }

    setAge({ years, months, days });
    setEmptyDay(false)

    if(!birthday){
      setEmptyDay(true)
    }else{
      setEmptyDay(false)
    }

    if(!birthmonth){
      setEmptyMonth(true)
    }else{
      setEmptyMonth(false)
    }

    if(!birthyear){
      setEmptyYear(true)
    }else{
      setEmptyYear(false)
    }


  };

  const today = new Date();
  const currentYear = today.getFullYear()
  console.log(age)
  return (
    <div className='container'>
      <div className='input-container'>
        <div className='single-input'>
          <label className={birthday > 31 || emptyDay ? 'input--error' :'input--label'}>DAY</label>
          <input type="number"
          className={ birthday > 31 || emptyDay ? "date-error-input" :"date-input"}
          value={birthday}
          onChange={(e) => setBirthday(parseInt(e.target.value))} 
          placeholder='DD' 
          min="1" max="31"></input>
          {birthday > 31 ? <p className='text--error'>Must be a valid date</p> : ""}
          {emptyDay && <p className='text--empty-error'>This field is required</p>}
        </div>
        <div className='single-input'>
          <label className={birthmonth > 12 || emptyMonth ? 'input--error' :'input--label'}>MONTH</label>
          <input type="number" 
          className={ birthmonth > 12 || emptyMonth ? "date-error-input" :"date-input"}
          value={birthmonth}
          onChange={(e) => setBirthMonth(parseInt(e.target.value))} 
          placeholder='MM'
          min="1" max="12"></input>
          {birthmonth > 12 ? <p className='text--error'>Must be a valid month</p> : ""}
          {emptyMonth && <p className='text--empty-error'>This field is required</p>}
        </div>
        <div className='single-input'>
          <label className={birthyear > currentYear || emptyYear ? 'input--error' :'input--label'}>YEAR</label>
          <input type="number" 
          className={ birthyear > currentYear || emptyYear ? "date-error-input" :"date-input"}
          value={birthyear}
          onChange={(e) => setBirthYear(parseInt(e.target.value))} 
          placeholder='YYYY'
          min="1900" max="2023"></input>
          {birthyear > currentYear ? <p className='text--error'>Must be in the past</p> : ""}
          {emptyYear && <p className='text--empty-error'>This field is required</p>}
        </div>
      </div>
      <hr />
      <button onClick={calculateAge}><img className='icon' src={arrowIcon} /></button>
      <div className='age-display'>
        <div className='date'>
        {age.years ? <h1 className='date--number'>{age.years}</h1> : <h1 className='date--number'>- -</h1>}
          <h1>years</h1>
        </div>
        <div className='date'>
        {age.months ? <h1 className='date--number'>{age.months}</h1> : <h1 className='date--number'>- -</h1>}
          <h1>months</h1>
        </div>
        <div className='date'>
          {age.days ? <h1 className='date--number'>{age.days}</h1> : <h1 className='date--number'>- -</h1>}
          <h1>days</h1>
        </div>
      </div>
    </div>
  )
}

export default App
