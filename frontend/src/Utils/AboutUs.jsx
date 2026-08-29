
function AboutUs(){
    return (
        <div className="bg-blue-50 font-sans min-h-screen flex flex-col">


        <div className="bg-[rgb(9,66,86)]">

        </div>

        <main className="mx-auto w-full max-w-6xl px-6 py-12">

            <section className="text-center mb-12">
                <h1 className="text-3xl font-bold text-sky-900 mb-2">
                    About <span className="text-sky-600">HomieeBook</span>
                </h1>
                <p className="text-lg text-gray-600">Residence For You</p>
            </section>

            <section className=" bg-white shadow-2xl rounded-2xl shadow p-8 mb-12">
                <p className="leading-relaxed text-lg">
                    At <span className="font-semibold text-sky-700">HomieeBook</span>, our mission is simple:
                    to make every stay feel like home. We believe booking a house shouldn’t be complicated or stressful.
                    That’s why we built a platform that combines trust, transparency, and convenience for both guests
                    and hosts.
                </p>
            </section>

            <section className="mt-4 mb-12">
                <h2 className="text-3xl font-semibold text-sky-900 mb-6 text-center">What We Offer</h2>
                <div className="grid md:grid-cols-2 gap-4">

                    <div className="box bg-sky-800 text-white shadow rounded-xl p-6 transition duration-500 mt-2 hover:bg-white hover:text-sky-700">
                        <h3 className="text-xl font-semibold mb-2">Wide Range of Homes</h3>
                        <p>From modern city apartments to peaceful countryside
                            retreats.</p>
                    </div>


                    <div className="box bg-sky-800 text-white shadow rounded-xl p-6 transition duration-500 mt-2 hover:bg-white hover:text-sky-700">
                        <h3 className="text-xl font-semibold mb-2">Seamless Experience</h3>
                        <p className="">Browse, book, and pay with ease through our secure system.</p>
                    </div>

                    <div className="box bg-sky-800 text-white shadow rounded-xl p-6 transition duration-500 mt-2 hover:bg-white hover:text-sky-700">
                        <h3 className="text-xl font-semibold mb-2">Trusted Community</h3>
                        <p className="">Real reviews from real people, ensuring honest and reliable stays.</p>
                    </div>

                    <div className="box bg-sky-800 text-white shadow rounded-xl p-6 transition duration-500 mt-2 hover:bg-white hover:text-sky-700">
                        <h3 className="text-xl font-semibold mb-2">Reliable Support</h3>
                        <p className="">Our team is always here to assist you, from booking to check-out.</p>
                    </div>

                </div>
            </section>

            <section className="mt-2 p-8 rounded-2xl shadow-xl border-1 border-sky-700 text-center tarnsition duration-500 hover:scale-110">
                <h2 className="text-3xl font-semibold text-sky-700 mb-4">Our Vision</h2>
                <p className="text-lg max-w-3xl mx-auto">
                    We want to build more than just a booking system.
                    HomieeBook is a community where guests discover memorable stays
                    and hosts share their spaces with confidence.
                    Whether you’re planning a quick getaway or a long-term stay,
                    our goal is to make you feel at home, anywhere.
                </p>
            </section>
        </main>

        </div>
    );
}

export default AboutUs;