import React, { useState } from "react";
import { AnimatePresence, easeIn, motion } from "framer-motion";
import { easeInOutQuint } from "@/config/eases";
import TripleViz from "../TripleViz/TripleViz";
import GridTitle from "../Elements/GridTitle";
import EmphasizeOnScroll from "../Elements/EmphasizeOnScroll";

export default function Contact() {
  const [vizActive, setVizActive] = useState(false);
  const [webActive, setWebActive] = useState(false);

  return (
    <section
      className="relative w-full bg-[var(--background-invert)] px-4 lg:px-12 rounded-b-[1rem]"
      id="contact"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT SIDE */}
        <div className="flex flex-col col-span-1 gap-12">
          <span className="text-gray-700 font-serif italic font-extralight tracking-wide uppercase lg:sticky lg:top-12">
            02. With me
          </span>
        </div>
        {/* RIGHT SIDE */}
        <div className="col-span-2 flex flex-col gap-12 w-full pb-24">
          <h1
            className="text-6xl font-serif text-left font-normal text-stone-700 mb-2"
            style={{
              textWrap: "balance",
            }}
          >
            I am <EmphasizeOnScroll>available</EmphasizeOnScroll> for freelance
            work and new collaborations.
          </h1>
          <h2
            className="text-1.5xl leading-snug font-sans text-left font-normal text-stone-500 mb-2"
            style={{
              textWrap: "pretty",
            }}
          >
            I keep an intentionally small roster of clients to ensure mutual
            interest & easy collaboration. There are two main channels I work
            with clients through:
          </h2>

          <div className="flex flex-col gap-2">
            <GridTitle>Choose your starter</GridTitle>
            <div className="flex flex-col md:flex-row gap-2">
              <ServiceCard
                title="Data visualization"
                description="Elegant, interactive data visualization design and development for
        established clients in government, journalism, and research."
                color="blue"
                active={vizActive}
                setActive={setVizActive}
              >
                <VizScreen active={vizActive} />
              </ServiceCard>
              <ServiceCard
                title="Web development"
                description="Robust, performant web and application development ideal for startups going from 0 to 1."
                color="rose"
                active={webActive}
                setActive={setWebActive}
              >
                <WebsiteScreen active={webActive} />
              </ServiceCard>
            </div>
            <div className="w-full text-right">
              <p className="mt-6 text-gray-500 font-sans max-w-2xl ml-auto">
                Note: I maintain a minimum engagement fee of $8,000 per month of
                work, which allows me to allocate the necessary time and
                resources to deliver exceptional results.
              </p>
              {/* <Link
                href="#"
                className="mt-6 text-gray-500 font-serif flex items-center gap-1 justify-end"
              >
                Get in touch <ArrowRightIcon className="w-4 h-4" />
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  title,
  description,
  color,
  children,
  active,
  setActive,
}: {
  title: string;
  description: string;
  color: string;
  children: React.ReactNode;
  active: boolean;
  setActive: any; // fixme.
}) {
  return (
    <div
      className={`shadow hover:shadow-none transition-all duration-500 cursor-pointer group w-full rounded-lg px-3 py-4 border-2 border-solid ${
        color === "rose" ? "border-rose-400" : "border-blue-400"
      } flex flex-col gap-1 bg-gradient-to-bl ${
        color === "rose"
          ? "from-rose-50 to-rose-100"
          : "from-blue-50 to-blue-100"
      }`}
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
      onClick={() => {
        alert("Popup: Email, meet, DM");
      }}
    >
      {children}
      <h2
        className={`text-xl font-serif leading-none mt-4 mb-1 ${
          color === "rose" ? "text-rose-500" : "text-blue-500"
        }`}
      >
        {title}
      </h2>
      <h2
        className={`text-sm font-sans leading-snug ${
          color === "rose" ? "text-rose-400" : "text-blue-400"
        }`}
      >
        {description}
      </h2>
    </div>
  );
}

function VizScreen({ active }: { active: boolean }) {
  return (
    <div className="h-[227px] rounded bg-blue-50 border border-solid border-blue-400 overflow-hidden relative p-4">
      <TripleViz active={active} />
    </div>
  );
}

function WebsiteScreen({ active }: { active: boolean }) {
  return (
    <div className="h-[227px] rounded bg-rose-50 border border-solid border-rose-400 overflow-hidden">
      <div
        // style={{
        //   justifyContent: active ? "flex-start" : "space-between",
        // }}
        style={{
          justifyContent: "space-between",
        }}
        className="flex w-full gap-1.5 px-2 py-2 border-b border-solid border-rose-200"
        id="site"
      >
        <div className="w-4 h-4 rounded-full bg-rose-200 border border-solid border-rose-400" />
        <motion.p
          layout="position"
          className="text-xs text-gray-600"
          initial={false}
          transition={{ ease: easeInOutQuint, duration: 0.5, delay: 0.5 }}
        >
          Your Co.
        </motion.p>
      </div>
      <div className="flex flex-row w-full h-48">
        <div className="bg-rose-50 h-full w-full border-r border-solid border-gray-200 flex flex-col items-start px-[8px] justify-center">
          <p
            key="rev"
            className="text-[16px] text-rose-500 mb-[3px] relative w-full"
          >
            <span className="opacity-0 pointer-events-none leading-snug">
              Revolutionizing fake copy.
            </span>
            <motion.span
              key="cre"
              // initial={{ opacity: 0, y: 10 }}
              // animate={{ opacity: 1, y: 0 }}
              // exit={{ opacity: 0, y: 10 }}
              animate={{
                opacity: active ? 0 : 1,
                y: active ? 5 : 0,
              }}
              transition={{
                delay: active ? 0 : 0.25,
                duration: 0.2,
              }}
              className="text-[16px] text-rose-500 mb-[3px] absolute top-0 left-0 leading-snug"
            >
              Revolutionizing fake copy.
            </motion.span>

            <motion.span
              key="since"
              animate={{
                opacity: active ? 1 : 0,
                y: active ? 0 : -5,
              }}
              transition={{
                delay: active ? 0.25 : 0,
                duration: 0.2,
              }}
              className="text-[16px] text-rose-500 mb-[3px] absolute top-0 left-0 leading-snug"
            >
              Creating elegant sites.
            </motion.span>
          </p>
          <span className="text-[10px] text-rose-400 leading-snug">
            Since 2019, I&apos;ve mastered the art of{" "}
            {active ? "making cool" : "adding fake copy in"} hero sections
          </span>
        </div>
        <div className="bg-gray-50 h-full w-full">
          <motion.div
            layout
            className="h-full mx-auto aspect-square grid grid-cols-3 grid-rows-3 p-[30px] gap-1"
          >
            {[...Array(9)].map((_, i) => {
              return (
                <motion.div
                  key={i}
                  layout
                  style={{
                    "--col": active ? 2 : "unset",
                    "--row": active ? 2 : "unset",
                    gridColumn: "var(--col)",
                    gridRowStart: "var(--row)",
                  }}
                  animate={{
                    scale: active && i == 8 ? 1.5 : 1,
                  }}
                  transition={{
                    ease: easeInOutQuint,
                    duration: 0.5,
                    delay: i * 0.05,
                  }}
                  className="bg-gray-100 border border-solid border-gray-200 rounded-full col-span-1 row-span-1"
                >
                  <AnimatePresence>
                    {i === 8 && (
                      <motion.div
                        layout
                        key="icon"
                        animate={{
                          opacity: active ? 1 : 0,
                        }}
                        transition={{
                          ease: easeInOutQuint,
                          duration: 0.5,
                          delay: i * 0.05,
                        }}
                        className="w-full h-full flex items-center justify-center text-xs text-gray-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 387.3642 387.3311"
                          className="w-8 h-8"
                          fill="currentColor"
                        >
                          <path d="M236.4132,102.3841c1.3143-4.3775,3.2393-8.5,5.9405-12.2203,5.9187-8.1515,14.3074-8.0716,20.0511,.1597,4.1217,5.9069,5.8044,12.7092,7.2047,19.6019,1.2871,6.3356,1.6739,12.7741,1.9723,20.0204,.1018,13.0081-.8994,26.6684-5.4209,39.8593-1.6081,4.6916-3.616,9.186-6.9558,12.9384-5.4897,6.168-12.5883,6.0733-17.7703-.3156-4.2956-5.296-6.324-11.6306-7.6173-18.1799-4.1108-20.8174-3.5274-41.4702,2.5958-61.8637Zm-118.2872-.6315c1.4508-4.0296,3.3062-7.8714,6.1083-11.1651,5.6754-6.6707,13.2578-6.4981,18.5099,.4952,4.5651,6.0789,6.556,13.2131,7.7571,20.55,3.4173,20.8761,2.9517,41.5308-4.1219,61.7132-1.5145,4.3215-3.6264,8.3484-6.8599,11.6775-4.9447,5.0908-11.3593,5.1126-16.2709-.0192-3.5644-3.7241-5.4757-8.3851-6.9476-13.2168-3.1513-10.3445-4.0312-20.9949-4.1139-32.4948,.2055-12.2916,1.4836-25.1656,5.939-37.5401Zm227.3549,90.7997l-.1426,.1688c-2.0419,2.4542-4.5403,5.166-8.3481,6.2858-.86,.2533-1.1311,.5189-1.2686,1.7892-3.5647,32.8948-17.0651,62.6377-40.1244,88.4014-24.5611,27.4419-55.3358,43.1783-91.47,46.7718-4.4068,.4383-8.8455,.6612-13.1944,.6612-20.6462,0-40.678-4.9596-59.5388-14.7403-36.337-18.8423-60.9335-47.9861-75.1942-89.0953-2.8188-8.1257-4.9405-16.7467-6.4871-26.3557-.1953-1.2129-.5337-1.7118-1.4485-2.1359-2.752-1.2765-4.6544-3.4892-6.1522-5.4857-.4893-.6527-1.6354-2.1805-.5785-3.8653,.3583-.5706,1.0664-1.2499,2.4087-1.2499,.298,0,.6074,.0351,.9104,.074l.2805,.0337c.8058,.0811,1.6105,.1779,2.4147,.2741,1.297,.1561,2.6383,.3173,3.9423,.4027,.4804,.0318,.9567,.047,1.4291,.047,3.7755,0,7.6227-.987,11.7624-3.0167l.3075-.1551c.6716-.342,1.5077-.7675,2.4759-.7675,.8845,0,1.6757,.343,2.3509,1.0184,1.7589,1.7607,.7868,3.7775,.2646,4.8609-1.2626,2.6202-3.4675,6.2919-8.0173,7.9284-.5636,.203-.6094,.2196-.4515,1.0497,7.6899,40.4082,25.9165,71.1272,55.721,93.914,21.7513,16.629,46.8815,25.1945,74.6924,25.4573,31.1305-.3358,59.1915-11.1429,83.372-32.1235,22.6826-19.679,37.8672-44.5653,46.4206-76.0788,1.6603-6.1165,2.8711-11.1605,3.8128-15.8739,.291-1.4552,.0738-1.7304-.9098-2.191-2.3329-1.0914-4.4297-2.7677-6.5992-5.276-.5631-.6498-2.0589-2.3778-.7325-4.3819,.6936-1.0487,1.7171-1.6027,2.9598-1.6027,.574,0,1.1839,.1186,1.8636,.3624,3.3883,1.2157,6.7467,1.8319,9.9805,1.8319,3.177,0,6.3481-.5948,9.4254-1.7678,.7076-.2699,1.3045-.3956,1.8795-.3956,1.0365,0,1.9114,.4217,2.5303,1.22,1.3662,1.7602,.0259,3.3336-.5471,4.0057Z" />
                          {/* <path d="M194.0438,387.3311c-50.5711,0-98.3616-19.1383-134.6783-53.9461C22.6742,298.2177,1.6232,250.7329,.0912,199.6775-1.4762,147.4705,17.2058,98.0542,52.695,60.5322,88.316,22.8711,136.5039,1.397,188.3825,.0652c51.779-1.3139,100.8439,17.2706,138.1635,52.3703,37.0519,34.8489,58.5924,82.1171,60.653,133.0977,2.1481,53.1387-16.7161,103.4395-53.1177,141.6381-36.5775,38.3821-85.9997,59.7466-139.1606,60.1576-.292,.0011-.5861,.0021-.877,.0021Zm-.4838-376.5389c-1.6327,0-3.2623,.0211-4.9013,.0632-48.9868,1.257-94.488,21.5331-128.1221,57.0935C27.0342,103.3703,9.3995,150.0371,10.8794,199.3539c1.4472,48.2095,21.3192,93.0423,55.9546,126.2396,34.294,32.8684,79.4404,50.9421,127.1929,50.9442,.2783,0,.5492-.0011,.8285-.0021,50.1937-.3879,96.8701-20.5634,131.4123-56.81,34.3672-36.0632,52.1764-83.5649,50.1463-133.756h0c-1.9458-48.1399-22.2826-92.7709-57.2632-125.6714C285.0977,28.2694,240.6601,10.7922,193.56,10.7922Z" /> */}
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
