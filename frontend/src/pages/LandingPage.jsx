import React from 'react'
import Header from "../components/Header/Header";
import Banner from '../components/Banner';
import LandingContent from '../components/LandingContent';

const LandingPage = () => {
  return (
    <div>
      <Header />
        <Banner imgSrc={"/images/banner.jpg"} />
 
        <LandingContent
         title='Startup Incubators, Defined'
          content= {`A startup incubator is a collaborative program designed to help new startups succeed. Incubators help entrepreneurs solve some of the problems commonly associated with running a startup by providing workspace, seed funding, mentoring, and training (see list below for a a more extensive list of common incubator services). The sole purpose of a startup incubator is to help entrepreneurs grow their business.

          Startup incubators are usually non-profit organizations, which are usually run by both public and private entities. Incubators are often associated with universities, and some business schools (such as Columbia or McCombs) allow their students and alumni to take part in these programs. There are several other incubators, however, that are formed by governments, civic groups, startup organizations or successful entrepreneurs.

          While most of the media emphasis focuses on tech startups, incubators aren't just limited to one industry. In fact, the focus of incubators varies by region. North Carolina, for example, is home to five incubator farms. Given the strength of its restaurant and fashion industries, NYC is home to several incubators for both food and fashion. There are also all-purpose incubators that consider all kinds of startups, regardless of industry.

          While many people associate business incubators with the tech boom, this is not a new concept. In fact, the first startup incubator -- the Batavia Industrial Center -- was formed in 1959. The Batavia Industrial Center was founded in response to Batavia, NY's high unemployment rate and as a way to repurpose a vacant industrial building. Given the origins of the business incubator, it makes sense that the concept is making a huge comeback during the time of the Great Recession.

      `} 
          imgSrc = '/images/landingContent.jpg'/>
        
        <LandingContent 
        title='Virtual Incubation Program for Women Entrepreneurs' 
        content='StepUp Ventures (TSUV) offers all possible institutional support for start-ups incubated with them:

        StepUp Ventures works with startups for over 3 months to help them refine their product and pitch to culminate in a demo day to potential investors.
        StepUp Ventures will co-invest with other seed investors to help the startup along the journey to scale.
        During this 3-month program, TSUV helps entrepreneurs build and validate their startup to scale and to garner more support from like-minded partners in the Indian Startup ecosystem on the journey to becoming a world-class enterprise.
        TSUV two-tier team of coaches and mentors helps the startups to navigate in their quest to grow and improve their business.' 
        imgSrc = '/images/landingContent2.jpg'/>
    </div>
  )
}

export default LandingPage