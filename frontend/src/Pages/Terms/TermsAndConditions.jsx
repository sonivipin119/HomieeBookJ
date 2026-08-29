
function TermsAndConditionsPage()
{
    return (
        <div>
        <div className="container font-extrabold mx-auto p-8">
            <h1 className="font-extrabold text-2xl  text-sky-950 mb-5">Terms of Service</h1>
            <section className="mb-4">
                <h2 className="font-bold">1. Acceptance of Terms</h2>
                <p>
                    By accessing or using our services, you agree to be bound by these Terms of Service.
                </p>
            </section>
            <section className="mb-4">
                <h2 className="font-bold">2. Use of Service</h2>
                <p>
                    You agree to use the service only for lawful purposes and in accordance with these terms.
                </p>
            </section>
            <section className="mb-4">
                <h2 className="font-bold">3. Privacy Policy</h2>
                <p>
                    Please review our <a href="/privacy">Privacy Policy</a> for information on how we collect and use
                    data.
                </p>
            </section>
            <section className="mb-4">
                <h2 className="font-bold">4. Changes to Terms</h2>
                <p>
                    We reserve the right to modify these terms at any time. Changes will be posted on this page.
                </p>
            </section>
            <section className="mb-4">
                <h2 className="font-bold">5. Contact Us</h2>
                <p>
                    If you have any questions about these Terms, please contact us at support@example.com.
                </p>
            </section>
        </div>
        </div>
    );
}

export default TermsAndConditionsPage;