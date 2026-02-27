
const testEndpoint = async () => {
    const userId = 7;
    const slug = 'lavdene-bhojyam-therapy-1769980259882';

    try {
        const url = `http://localhost:3000/api/calendars/public/${userId}/${slug}`;
        console.log('Fetching:', url);
        const res = await fetch(url);

        if (res.ok) {
            console.log('SUCCESS: Calendar found');
            const data = await res.json();
            console.log('Title:', data.title);
            console.log('Therapist:', data.therapist_name);
        } else {
            console.log('FAILED:', res.status, res.statusText);
            const text = await res.text();
            console.log('Response:', text);
        }
    } catch (err) {
        console.error('Error:', err);
    }
};

testEndpoint();
