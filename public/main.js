// public/main.js
new Vue({
    el: '#app',
    data: {
        message: 'Welcome to Weasley Wizard Wheezes!',
	cancelMessage: 'Do you want to cancel your monthly Weasley Wizard Wheezes subscription box?'
    },
    mounted() {
        const churnkeyButton = document.getElementById('churnkeyButton');

        if (churnkeyButton) {
            churnkeyButton.addEventListener('click', async () => {
                // Customer created in Stripe; id hardcoded here:
                const STRIPE_CUSTOMER_ID = 'cus_PgQmkfNsN5UgJH';

                // Make a request to server to get the security token
                const response = await fetch('http://localhost:3000/getSecurityToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ STRIPE_CUSTOMER_ID }),
                });

                const data = await response.json();
                const { securityToken } = data;

                // Initialize Churnkey with the obtained security token
                window.churnkey.init('show', {
                    customerId: STRIPE_CUSTOMER_ID,
                    authHash: securityToken,
                    appId: '8rfgnmjy5',
                    mode: 'test',
                    provider: 'stripe',
                }).catch(error => {
  console.log('Churnkey initialization error:', error);
});
            });
        }
    },
});

