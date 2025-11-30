import React from 'react'
import { testimonialStyles as styles } from '../../assets/dummyStyles'
import testimonialData from './Testimonialdata'
import { FaQuoteLeft, FaCar as FarCar, FaStar } from 'react-icons/fa'
import { GiSteeringWheel } from 'react-icons/gi'

const Testimonials = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.badge}>
            <FarCar className={'${styles.quoteIcon} mr-2'} />
            <span className={styles.badgeText}>Customer Experiences</span>
          </div>
          <h1 className={styles.title}>Premium <span className={styles.accentText}>Drive</span>Experiences</h1>

          <div className={styles.dividerContainer}>
            <div className={styles.dividerLine}>
              <GiSteeringWheel className={'${styles.accentText} mx-4'} size={24} />
              <div className={styles.dividerContainer}></div>
            </div>
          </div>
          <p className={styles.subtitle}>Hear from our valued customers about the their journey with our premium fleet</p>
        </div>
        <div className={styles.grid}>
          {testimonialData.map((testimonial, idx) => {
            const shape = styles.cardShapes[idx % styles.cardShapes.length];
            const IconComponent = styles.icons[idx % styles.icons.length];
            return (
              <div
                key={testimonial.id}
                className={styles.card}
                style={{
                  clipPath: "polygon(0% 10%, 10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%)",
                  background:
                    "linear-gradient(145deg, rgba(30,30,40,0.8), rgba(20,20,30,0.8))",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(100,100,120,0.2)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}
              >
                <div className={styles.cardContent}>
                  <div className='flex justify-between items-start mb-6'>
                    <FaQuoteLeft className={styles.quoteIcon} size={28} />
                    <div className={styles.ratingContainer}>
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < testimonial.rating ? styles.accentText : 'text-gray-700'}
                          size={18}
                        />
                      ))}
                    </div>
                  </div>
                  <p className={styles.comment}>"{testimonial.comment}"</p>

                  <div className={styles.carInfo}>
                    <GiSteeringWheel className={styles.carIcon} size={20} />
                    <span className={styles.carText}>{testimonial.car}</span>
                  </div>

                  <div className={styles.authorContainer}>
                    <div className={styles.avatar}>
                      {testimonial.name.charAt(0)}
                    </div>

                    <div className={styles.authorInfo}>
                      <h3 className={styles.authorName}>
                        {testimonial.name}
                      </h3>
                      <p className={styles.authorRole}>{testimonial.role}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.decorativeCorner}></div>
                <div className={styles.patternIcon}>
                  <IconComponent size={36} />
                </div>
              </div>
            );
          })}
        </div>

          <div className={styles.statsContainer}>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statValue(styles.statColors.value[0])}>20k+</div>
                <div className={styles.statLabel(styles.statColors.label[0])}>Happy Customer</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue(styles.statColors.value[1])}>10k+</div>
                <div className={styles.statLabel(styles.statColors.label[1])}>Luxury Vehicals</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue(styles.statColors.value[2])}>24/7</div>
                <div className={styles.statLabel(styles.statColors.label[2])}>Support</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue(styles.statColors.value[3])}>20+</div>
                <div className={styles.statLabel(styles.statColors.label[3])}>Location</div>
              </div>
            </div>
          </div>

          <div className={styles.ctaContainer}>
            <h2 className={styles.ctsTitlle}>Ready for a exceptional journe?</h2>
            <p className={styles.ctaText}>
              Book your premium ride today and experience the difference!
            </p>
            <a href="/cars" className={styles.ctaButton}>
              Explore fleet!
            </a>
          </div>
      </div>
      <div className={styles.bottomGradient}></div>
    </div>
  )
}
export default Testimonials
