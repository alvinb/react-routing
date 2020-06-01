import 'whatwg-fetch';

export const FAKE_USER = {
  firstName: 'Alvin',
  lastName: 'Bundalian',
  userName: 'alvinb',
  avatar:
    'https://lh3.googleusercontent.com/-ccNJpz5eNlY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucm_eo71DGdZHEyxf7o5CeP78w37pQ/photo.jpg?sz=46',
};


export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'alvinb' && password === 'secret') {
        resolve(FAKE_USER);
      } else {
        reject({ message: 'Invalid username or password' });
      }
    }, 300);
  });
}


export async function fetchGeo() {
  return fetch('/api/getregion.json')
    .then((res) => res.json())
    .catch(err => {
      throw new Error(err)
    });
}

export function isInRegion(country, allowedCountries) {
  if (!country) return null;

  if(allowedCountries.length === 0) return true;
  const countries = allowedCountries.split(',').filter((c)=>c.trim().length>0);
  return countries.indexOf(country) >= 0 || countries.length === 0;
}
