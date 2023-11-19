fetch('/api/cohorts/', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": `BywnEawe-Qbepe2mtfJ4v6QaJv0-GQE0i3M4`
    },
    body: JSON.stringify({ cohort: 'JAN-20-2024' })
}).then(res => res.json()).then(data => console.log(data));

fetch('/api/session/', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": `BywnEawe-Qbepe2mtfJ4v6QaJv0-GQE0i3M4`
    },
    body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));




fetch('/api/cohorts/1/students/new/', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": `BywnEawe-Qbepe2mtfJ4v6QaJv0-GQE0i3M4`
    },
    body: JSON.stringify({ firstName: 'New', lastName: 'Dude', email: 'email@email.com', timeZone : 'PST', status: 'present'})
}).then(res => res.json()).then(data => console.log(data));
