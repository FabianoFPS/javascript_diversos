import assert from 'assert';

const date = new Date('2022-01-25 14:37:52'); 
/*
>node -p "new Date('2022-01-25 00:00')"
2022-01-25T03:00:00.000Z
*/
{
  const regex = /^([0-9]{4})-(0[1-9]|1[0-2])-(0[0-9]|1[0-9]|2[0-9]|3[0-1]|)/;
  const [full, year, month, day] = regex.exec(date.toISOString());
  const actual = `${day}/${month}/${year}`;
  const expected = '25/01/2022';
  assert.equal(actual, expected);
}

// date.toLocaleDateString
const options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}

{
  const actual = date.toLocaleDateString('pt-br', options);
  const expected = `25 de janeiro de 2022`;
  assert.equal(actual, expected);
}

{
  const actual = date.toLocaleDateString('pt-br', {
    ...options,
    month: 'numeric'
  });
  const expected = `25/01/2022`;
  assert.equal(actual, expected);
}

// Intl
{
  const actual = Intl.DateTimeFormat('pt-br').format(date);
  
  const expected = `25/01/2022`;
  assert.equal(actual, expected);
}

{
  const actual = Intl.DateTimeFormat(
    'pt-br',
    {
      dateStyle: 'full',
      timeStyle: 'long'
    }).format(date);
  
  const expected = 'terça-feira, 25 de janeiro de 2022 14:37:52 BRT';
  assert.equal(actual, expected);
}