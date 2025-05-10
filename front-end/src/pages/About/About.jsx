import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Accordian from "../../components/Accordian/accordian";
import { useTheme } from "../../context/ThemeContext";
import "./About.css";
import { FaLeaf, FaUsers, FaBolt, FaHandshake } from "react-icons/fa";
function About() {
  const { theme } = useTheme();

  // Helper for theme classes
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-dark text-light" : "bg-light text-dark";
  const cardBg = isDark ? "bg-secondary text-light" : "bg-white text-dark";
  const cardFooterBg = isDark
    ? "bg-success bg-opacity-75 text-light"
    : "bg-success text-white";
  const sectionBg = isDark ? "bg-dark" : "bg-light";
  const introBg = isDark ? "bg-success bg-opacity-25" : "bg-success bg-opacity-10";
  const faqBg = isDark ? "bg-secondary" : "bg-white";

  return (
    <div className={`about-page min-vh-100 ${bgClass}`}>
      <Header />

      <section className={`about-intro text-center py-5 ${introBg} mt-5`}>
        <h2 className="display-5 mb-3">About Swift Mobility</h2>
        <p className="mx-auto fw-bold" style={{ maxWidth: 700 }}>
          At Swift Mobility, we are on a mission to reshape the way Africa — and
          the world — moves. Our smart e-bike and scooter network isn’t just
          about speed and convenience; it’s a blueprint for greener cities,
          economic empowerment, and accessible technology.
        </p>
      </section>
      <section className="OurVideo">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/jdhbp1cRssU?si=YCvBLsLw8pdzogbe"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </section>
      <section
        className={`story container my-5 py-4 rounded-4 shadow ${cardBg}`}
      >
        <div className="row align-items-center">
          <div className="col-md-5 mb-4 mb-md-0 text-center">
            <img
              src="https://i.postimg.cc/RFsXzrbd/OurStory.jpg"
              alt="Our Story"
              className="img-fluid rounded-3 shadow"
            />
          </div>
          <div className="col-md-7">
            <h3 className="text-success mb-3 fw-bold">Our Story</h3>
            <p
              className={`rounded-3 p-3 ${
                isDark
                  ? "bg-dark bg-opacity-50 text-light"
                  : "bg-light text-secondary"
              }`}
            >
              What started as a bold idea among founders passionate about
              mobility, sustainability, and digital innovation has now grown
              into Swift — a next-generation micro-mobility startup. Born in
              Ethiopia and designed for Africa, Swift provides electric bikes
              and scooters to urban centers, campuses, and delivery workers —
              all powered by intuitive mobile technology, blockchain rewards,
              and AI optimization.
              <br />
              <br />
              We saw a city held back by traffic, pollution, and outdated
              transport. We imagined a future with cleaner air, faster commutes,
              and more empowered youth. So we built it.
            </p>
          </div>
        </div>
      </section>


      <div className="mission-title text-center text-success fw-bold display-6 my-5">
        Our Mission
      </div>

      <div className="flip-card-container">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front" id="sustainable">
              <h3>Sustainability</h3>
            </div>
            <div className="flip-card-back">
              <p>
                We are committed to building cities that breathe — clean, green,
                and sustainable for future generations.
              </p>
            </div>
          </div>
        </div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front" id="Innovation">
              <h3>Innovation with Purpose</h3>
            </div>
            <div className="flip-card-back">
              <p>
                We don’t add technology for the hype — we integrate AI,
                blockchain, and mobility solutions where they make life
                genuinely better.
              </p>
            </div>
          </div>
        </div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front" id="accessibility">
              <h3> Accessibility</h3>
            </div>
            <div className="flip-card-back">
              <p>
                Everyone deserves modern transport. Our pricing, design, and
                access points are inclusive by default.
              </p>
            </div>
          </div>
        </div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front" id="community">
              <h3> Community First</h3>
            </div>
            <div className="flip-card-back">
              <p>
                We are committed to building cities that breathe — clean, green,
                and sustainable for future generations.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className={`about-faq py-5 ${faqBg}`}>
        <div className="container">
          <h2 className="text-success fw-bold text-center mb-3">
            Frequently Asked Questions
          </h2>
          <p
            className={`text-center mb-4 ${
              isDark ? "text-light" : "text-secondary"
            }`}
          >
            Find answers to common questions about our services, technology, and
            mission.
          </p>
          <div className="about-faq-accordion">
            <Accordian />
          </div>
        </div>
      </section>
      <section className={`meet-team py-5 ${sectionBg}`}>
        <div className="container">
          <h3 className="team-title text-center mb-5">
            Meet <span className="text-success">Our Team</span>
          </h3>
          <div className="row g-4 justify-content-center">
            {/* Team 2 */}
            <div className="col-12 col-md-4">
              <div className={`card text-center h-100 shadow ${cardBg}`}>
                <img
                  src="https://i.postimg.cc/qMrmPdws/IMAGE-2025-05-06-10-23-30.jpg"
                  alt="Amanuel Teshome"
                  className="card-img-top rounded-circle mx-auto mt-4"
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
                <div className="card-body">
                  <h4 className="card-title">Amanuel Teshome</h4>
                  <p className="card-text">Co-founder & Business Strategist</p>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/amanuelteshome"
                      className="btn btn-outline-success btn-sm me-2"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://x.com/amanu_ell?t=_RQYVmMz5UlWJ5DX1Twk9g&s=35"
                      className="btn btn-outline-success btn-sm"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className={`card text-center h-100 shadow ${cardBg}`}>
                <img
                  src="https://i.postimg.cc/QdxfMkRV/IMAGE-2025-05-06-10-23-52.jpg"
                  alt="Helina Damte"
                  className="card-img-top rounded-circle mx-auto mt-4"
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
                <div className="card-body">
                  <h4 className="card-title">Helina Damte</h4>
                  <p className="card-text">Blockchain Advisor</p>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/hilina-damte-532751158?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                      className="btn btn-outline-success btn-sm me-2"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="#twitter"
                      className="btn btn-outline-success btn-sm"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className={`card text-center h-100 shadow ${cardBg}`}>
                <img
                  src="https://i.postimg.cc/bNGFpJPt/beza.jpg"
                  alt="Bezawit Semu"
                  className="card-img-top rounded-circle mx-auto mt-4"
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
                <div className="card-body">
                  <h4 className="card-title">Bezawit Semu</h4>
                  <p className="card-text">Co-founder & Project Manager</p>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/bezawit-semu-203a17232?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                      className="btn btn-outline-success btn-sm me-2"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="#twitter"
                      className="btn btn-outline-success btn-sm"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Team 1 */}
            <div className="col-12 col-md-4">
              <div className={`card text-center h-100 shadow ${cardBg}`}>
                <img
                  src="https://i.postimg.cc/13MkzzXc/cutie.jpg"
                  alt="Yordanos Abay"
                  className="card-img-top rounded-circle mx-auto mt-4"
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
                <div className="card-body">
                  <h4 className="card-title">Yordanos Abay</h4>
                  <p className="card-text">
                    UI/UX Designer & Front-End Developer
                  </p>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/yordanos-abay-0baa50320?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BtbOJRrTdQK2Bku6eUHSTQA%3D%3D"
                      className="btn btn-outline-success btn-sm me-2"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="#twitter"
                      className="btn btn-outline-success btn-sm"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className={`card text-center h-100 shadow ${cardBg}`}>
                <img
                  src="https://i.postimg.cc/ZqvF9fjY/Chat-GPT-Image-May-6-2025-10-20-50-AM.png"
                  alt="Tsion Shimelis"
                  className="card-img-top rounded-circle mx-auto mt-4"
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
                <div className="card-body">
                  <h4 className="card-title">Tsion Shimelis</h4>
                  <p className="card-text">Backend Developer</p>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/tsion-shimelis-389387264?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BNRXXutExRiC7eHrMob2%2B4Q%3D%3D"
                      className="btn btn-outline-success btn-sm me-2"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="#twitter"
                      className="btn btn-outline-success btn-sm"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className={`card text-center h-100 shadow ${cardBg}`}>
                <img
                  src="https://i.postimg.cc/zfypCDDr/Chat-GPT-Image-May-6-2025-10-22-06-AM.png"
                  alt="Selamawit Shimelis"
                  className="card-img-top rounded-circle mx-auto mt-4"
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
                <div className="card-body">
                  <h4 className="card-title">Selamawit Shimelis</h4>
                  <p className="card-text">Full-Stack Developer</p>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/selamawit-shimeles-991740353?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BpkRS38V3Tryd6E5woAYXfA%3D%3D"
                      className="btn btn-outline-success btn-sm me-2"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="#twitter"
                      className="btn btn-outline-success btn-sm"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default About;