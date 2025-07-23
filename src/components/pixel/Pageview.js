fetch('https://your-domain.com/api/pixel/convert', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    merchant_id: 1,
    event_name: 'PageView',
    event_data: {
      url: window.location.href,
      user_data: {
        em: 'hashed_email_here',
        ph: 'hashed_phone_here',
      },
      context: {
        ip: '123.123.123.123',
        user_agent: navigator.userAgent,
      },
      properties: {
        value: 150,
        currency: 'USD',
      }
    }
  })
})
.then(async res => {
  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }
  return res.json();
})
.then(data => {
  console.log("✅ تم إرسال الحدث بنجاح", data);
})
.catch(err => {
  console.error("❌ حدث خطأ أثناء إرسال الحدث", err);
});