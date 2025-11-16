import React, {useEffect, useState, lazy, Suspense} from "react";
import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import QuickStats from "../components/quickStats/QuickStats";
import Skills from "./skills/Skills";
import StackProgress from "./skillProgress/skillProgress";
import Education from "./education/Education";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "./topbutton/Top";
import SplashScreen from "./splashScreen/SplashScreen";
import Resume from "./resume/Resume";
import StickyNav from "../components/stickyNav/StickyNav";
import ScrollProgress from "../components/scrollProgress/ScrollProgress";
import MilestoneToasts from "../components/milestoneToasts/MilestoneToasts";
import ClickRipple from "../components/clickRipple/ClickRipple";
import SectionReveal from "../components/sectionReveal/SectionReveal";
import GameMode from "../components/gameMode/GameMode";
import CareerJourney from "../components/careerJourney/CareerJourney";
import GrowthTrajectory from "../components/growthTrajectory/GrowthTrajectory";
import PortfolioAnalytics from "../components/portfolioAnalytics/PortfolioAnalytics";
import LiveVisitors from "../components/liveVisitors/LiveVisitors";
import ConfettiCelebration from "../components/confettiCelebration/ConfettiCelebration";
import EasterEggs from "../components/easterEggs/EasterEggs";
import {splashScreen} from "../portfolio";
import {StyleProvider} from "../contexts/StyleContext";
import {useLocalStorage} from "../hooks/useLocalStorage";
import "./Main.scss";
import "../components/sectionReveal/SectionReveal.scss";

// Lazy load below-the-fold components
const StartupProject = lazy(() => import("./StartupProjects/StartupProject"));
const WorkingStyle = lazy(() =>
  import("../components/workingStyle/WorkingStyle")
);
const ArchitectureDiagram = lazy(() =>
  import("../components/architectureDiagram/ArchitectureDiagram")
);
const ChallengeMe = lazy(() => import("../components/challengeMe/ChallengeMe"));
const TechRadar = lazy(() => import("../components/techRadar/TechRadar"));
const CodeSnippets = lazy(() =>
  import("../components/codeSnippets/CodeSnippets")
);
// const Testimonials = lazy(() => import("../components/testimonials/Testimonials")); // Hidden until real testimonials available
const Achievement = lazy(() => import("./achievement/Achievement"));
const Blogs = lazy(() => import("./blogs/Blogs"));
const Talks = lazy(() => import("./talks/Talks"));
const Twitter = lazy(() => import("./twitter-embed/twitter"));
const Podcast = lazy(() => import("./podcast/Podcast"));

const Main = () => {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(true);

  useEffect(() => {
    if (splashScreen.enabled) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        splashScreen.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, []);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={isDark ? "dark-mode" : null}>
      <StyleProvider value={{isDark: isDark, changeTheme: changeTheme}}>
        {isShowingSplashAnimation && splashScreen.enabled ? (
          <SplashScreen />
        ) : (
          <>
            <Header />
            <Greeting />
            <QuickStats />
            <CareerJourney />
            <GrowthTrajectory />
            <Skills />
            <StackProgress />
            <Education />
            <Resume />
            <Suspense fallback={<div style={{minHeight: "100px"}} />}>
              <StartupProject />
              <WorkingStyle />
              <ArchitectureDiagram />
              <ChallengeMe />
              <TechRadar />
              <CodeSnippets />
              <PortfolioAnalytics />
              <Achievement />
              <Blogs />
              <Talks />
              <Twitter />
              <Podcast />
            </Suspense>
            <Footer />

            {/* Gamification Components */}
            <ScrollProgress />
            <MilestoneToasts />
            <ClickRipple />
            <SectionReveal />
            <GameMode />
            <LiveVisitors />
            <ConfettiCelebration />
            <EasterEggs />
            <StickyNav />
            <ScrollToTopButton />
          </>
        )}
      </StyleProvider>
    </div>
  );
};

export default Main;
