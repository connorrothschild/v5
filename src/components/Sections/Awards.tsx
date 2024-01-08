import { useRef } from "react";
import SplitTextHeader from "@/components/Elements/SplitTextHeader";
import { useScroll, motion, useTransform } from "framer-motion";

const awards = [
  {
    title: "Award of Excellence, 2023 Best of News Design Creative Competition",
    place: "Award of Excellence",
    place_code: "bronze",
    award: "2023 Best of News Design Creative Competition",
    organization: "Society for News Design",
    date: "2023-05-01",
    featured: true,
    media_url:
      "https://snd.org/best-of-design-competitions/snd44-annual-creative-competition-results/",
    project_url: "https://restofworld.org/2022/blackouts/",
  },
  {
    title: "Longlist, 5x",
    place: "Longlist (5x)",
    place_code: "bronze",
    award: "Information is Beautiful Awards",
    organization: "Information is Beautiful",
    date: "2022-12-01",
    featured: true,
    media_url:
      "https://www.informationisbeautifulawards.com/news/593-information-is-beautiful-awards-2022-the-winners",
    project_url: null,
  },
  {
    title: "Bronze, 2021 Malofiej Awards",
    place: "Bronze",
    place_code: "bronze",
    award: "2021 Malofiej Awards",
    organization: "Malofiej",
    date: "2021-06-18",
    featured: false,
    media_url:
      "https://web.archive.org/web/20210618094613/https://www.malofiejgraphics.com/awards/students-have-won-awards-too-2/2021/06",
    project_url:
      "https://www.connorrothschild.com/project/bob-ross-art-gallery",
  },
  {
    title: "1st Place, 2021 Student Design Contest",
    place: "1st Place",
    place_code: "gold",
    award: "2021 Student Design Contest",
    organization: "Society for News Design",
    date: "2021-05-10",
    featured: true,
    media_url: "https://msusnd.org/2021-college-design-contest/",
    project_url: "https://connorrothschild.github.io/bob-ross-art-gallery/",
  },
  {
    title: "Winner, The 2020 Pudding Cup",
    place: "Winner",
    place_code: "gold",
    award: "The 2020 Pudding Cup",
    organization: "The Pudding",
    featured: true,
    date: "2021-01-07",
    media_url: "https://pudding.cool/process/pudding-cup-2020/",
    project_url: "https://connorrothschild.github.io/cudi-hums/",
  },
  {
    title: "Honorable Mention, RStudio Table Contest",
    place: "Honorable Mention",
    place_code: "bronze",
    award: "RStudio Table Contest",
    organization: "RStudio, Inc.",
    date: "2021-01-06",
    featured: false,
    media_url:
      "https://blog.rstudio.com/2020/12/23/winners-of-the-2020-rstudio-table-contest/",
    project_url:
      "https://connorrothschild.github.io/v2/post/economist-table-replication-using-reactable",
  },
  {
    title: "2nd Place, 2020 D2K Showcase",
    place: "2nd Place",
    place_code: "silver",
    award: "2020 D2K Showcase",
    organization: "Data to Knowledge Lab",
    date: "2020-12-09",
    featured: false,
    media_url:
      "https://d2k.rice.edu/news/closing-gap-data-science-approach-reducing-academic-achievement-gaps",
    project_url: "https://www.youtube.com/watch?v=6T5C4omYexs",
  },
  {
    title: "Bronze, 2020 Malofiej Awards",
    place: "Bronze",
    place_code: "bronze",
    award: "2020 Malofiej Awards",
    organization: "Malofiej",
    date: "2020-08-07",
    featured: true,
    media_url:
      "https://web.archive.org/web/20210121150713/https://www.malofiejgraphics.com/general/students-have-won-awards-too/2020/08",
    project_url: "https://connorrothschild.github.io/map-missing-migrants/",
  },
  {
    title: "Hudspeth Award",
    place: "Winner",
    place_code: "gold",
    award: "Hudspeth Award",
    organization: "Rice Political Science Department",
    date: "2020-05-19",
    featured: false,
    media_url: "https://politicalscience.rice.edu/undergraduate-awards",
    project_url:
      "https://www.researchgate.net/publication/332470540_Vota_Testing_the_Impact_of_Spanish-Language_Ballots_on_Election_Results_and_Preferences",
  },
  {
    title: "1st Place, Coronavirus Houston Response Projects",
    place: "1st Place",
    place_code: "gold",
    award: "Coronavirus Houston Response Projects",
    organization: "Data To Knowledge Lab",
    date: "2020-04-15",
    featured: true,
    media_url:
      "https://news.rice.edu/2020/04/27/d2k-lab-awards-top-teams-at-virtual-showcase/",
    project_url: "https://github.com/connorrothschild/covid-mobility",
  },
  {
    title: "1st Place, 2020 Houston Policy Challenge",
    place: "1st Place",
    place_code: "gold",
    award: "2020 Houston Policy Challenge",
    organization: "Rice University",
    date: "2020-03-09",
    featured: false,
    media_url:
      "https://news.rice.edu/2020/03/02/rice-students-tackle-criminal-justice-reform-at-houston-policy-challenge/",
  },
  {
    title: "1st Place (Houston Track), 2020 Rice Datathon",
    place: "1st Place (Houston Track)",
    place_code: "gold",
    award: "2020 Rice Datathon",
    organization: "Rice DataSci Club",
    date: "2020-01-09",
    featured: false,
    media_url: "https://connorrothschild.github.io/datathon-2020/source/",
    project_url: "https://connorrothschild.github.io/datathon-2020/source/",
  },
  {
    title: "Student Winner, Computation + Journalism 2020 Conference",
    place: "Student Winner",
    place_code: "gold",
    award: "Computation + Journalism 2020 Conference",
    organization: "Northeastern University",
    date: "2020-01-07",
    featured: true,
    media_url: "https://cj2020.northeastern.edu/student-contest/",
    project_url: "https://connorrothschild.shinyapps.io/automation/",
  },
  // {
  //   title: "2nd Place, 2019 Houston Policy Challenge",
  //   place: "2nd Place",
  //   place_code: "silver",
  //   award: "2019 Houston Policy Challenge",
  //   organization: "Rice University",
  //   date: "2019-02-04",
  //   featured: false,
  //   media_url:
  //     "https://kinder.rice.edu/urbanedge/2019/02/26/affordable-housing-houston-rice-university",
  // },
  // {
  //   title: "1st Place, BIPP Competition",
  //   place: "1st Place",
  //   place_code: "gold",
  //   award: "BIPP Competition",
  //   organization: "The Baker Institute for Public Policy",
  //   date: "2018-04-15",
  //   featured: false,
  //   media_url:
  //     "https://mailchi.mp/rice.edu/gala-547673?e=a93e1ef59d#AnnualReport",
  //   project_url: "https://issuu.com/ricejpp/docs/rjppfinalsingle/20",
  // },
  // {
  //   title: "1st Place, 2018 Houston Policy Challenge",
  //   place: "1st Place",
  //   place_code: "gold",
  //   award: "2018 Houston Policy Challenge",
  //   organization: "Rice University",
  //   date: "2018-02-04",
  //   featured: false,
  //   media_url:
  //     "https://www.houstonpublicmedia.org/articles/news/2018/02/27/270232/rice-students-win-flood-policy-contest-for-multi-home-buyout-idea/",
  //   project_url:
  //     "http://news.rice.edu/2018/02/23/martel-college-students-win-rices-inaugural-houston-centered-policy-challenge/",
  // },
  // {
  //   title: "National Champion, IX Speaking",
  //   place: "International Extemporaneous Speaking",
  //   place_code: "gold",
  //   award: "National Champion",
  //   organization: "National Speech and Debate Association",
  //   date: "2017-07-15",
  //   featured: false,
  //   media_url:
  //     "https://www.news-leader.com/story/news/business/2017/06/28/kickapoo-high-school-senior-earns-accolades-national-speech-and-debate-tournament/435570001/",
  //   project_url: "https://www.youtube.com/watch?v=lzoUu1fDmWE",
  // },
];

export default function Awards() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    container: container,
  });

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 1],
    ["100%", "10%", "0%", "0%"]
  );
  return (
    <section
      className="relative w-full bg-gray-300 py-24 px-[20px]"
      // className="w-full bg-[var(--background)] min-h-[calc(100vh-1rem)] sticky top-[1rem] z-[2] py-12 px-4 rounded-t-[30px] flex flex-col justify-between gap-8"
      // style={{
      //   boxShadow: "0 0 20px rgba(0,0,0,.1)",
      // }}
      ref={container}
    >
      {/* <CornerPill>Awards</CornerPill> */}
      <div className="flex flex-col justify-between gap-8">
        <SplitTextHeader
          container={container}
          phrase="In my early career, my work has been recognized for the following awards."
        />

        {/* Horizontally scrollable list of projects */}
        {/* Tabular view */}
        <motion.div
          style={{
            translateY,
          }}
          className="flex flex-col justify-start items-start gap-4 w-full divide divide-y divide-gray-400"
        >
          {awards.map((award, i) => (
            <Card
              key={award.title + "_" + i}
              title={award.place}
              year={award.date.split("-")[0]}
              organization={award.organization}
              award={award.award}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const Card = ({
  title,
  year,
  organization,
  award,
}: {
  title: string;
  year: string;
  organization: string;
  award: string;
}) => {
  return (
    <div className="w-full flex flex-row justify-between items-center gap-2 pt-3">
      {/* <div className="flex flex-col justify-center gap-2"> */}
      <h1 className="leading-none text-xl font-serif text-left font-regular text-stone-700 pt-1">
        {title}
        <span className="ml-3 text-stone-500 font-sans text-base font-light leading-none">
          {award} @ {organization}
        </span>
      </h1>
      {/* </div> */}
      <span className="pt-1 font-sans font-normal text-stone-500">{year}</span>
    </div>
  );
};
