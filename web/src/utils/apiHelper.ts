export default async (url = '/', data?: any, opts?: any) => {
  try {
    if (data) opts.body = JSON.stringify(data);
    let res = await fetch(`${process.env.REACT_APP_API}${url}`, {
      ...opts,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let json = await res.json();
    return json;
  } catch (e) {
    console.error('Fetch error', e);
    return e;
  }
};
