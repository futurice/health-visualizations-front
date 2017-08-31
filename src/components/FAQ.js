import React, { Component } from 'react';
import SearchBox from './SearchBox';
import '../css/FAQ.css';

export default class FAQ extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  render() {
    return (      
      <div className="faq-content">
        <SearchBox
          history={this.props.history}
          match={this.props.match}
        />
        <h3 className="heading-3 white centered">
          FAQs
        </h3>



        <p className="faq-question">
          How is Relevance calculated?
        </p>
        <p className="faq-answer">
          Relevance is actually a statistical metric called Lift. It is easiest to grasp by example: suppose you searched for "burana" and one of the results was "headache". Let's say that "headache" appears in 2% of all discussion posts. However, when we look at posts which include "burana", within that subset "headache" appears in 6% of posts. In this example, the Relevance value would be 6%/2% = 300%. In other words, the appearence of our search term "burana" triples the frequency at which "headache" appears in posts. We could also say that "burana" *lifts* "headache" by 3x.
        </p>



        <p className="faq-question">
          Why use a complicated metric instead of simple postcount?
        </p>
        <p className="faq-answer">
          If we used a simple postcount, popular topics of discussion would dominate the results (spoiler alert: cannabis on every plot). Relevance helps us capture the strongest connections between drugs and symptoms, as they appear in discussions.
        </p>



        <p className="faq-question">
          A result has high Relevance value. Does this mean people talk about it a lot?
        </p>
        <p className="faq-answer">
          No. For example, the result could be a rare drug which is *only* talked about in conjunction with another rare drug. If you searched for either of these drugs, they would show up on each others' plots with high relevance values - despite the fact that they are not common topics. In this case the high Relevance value is telling us that the discussions exhibit a strong connection between these 2 drugs.
        </p>



        <p className="faq-question">
          What is the purpose of sample size filtering?
        </p>
        <p className="faq-answer">
          Sample sizes are very important in statistics. If we have a small sample size, we can calculate metrics like Relevance, but the numbers we get are highly influenced by luck. It's easy to draw erroneous conclusions from small samples. As an example, let's say we had no filtering (you can try this by pulling the slider to 0). If you search for "burana", the top drug in results sorted by Relevance will be "trometamolum". If you click on the bubble in the plot to see the actual posts, you will find out that there are only 3 posts which include both "burana" and "trometamolum". 3 posts is a small sample size. Furthermore, they are the exact same post somebody posted 3 times on Suomi24. This result has a high Relevance value, because "trometamolum" is not mentioned anywhere else. Therefore it is very strongly associated with burana and it will have the highest possible Relevance value. Does it make sense - based on 1 post that somebody wrote on the internet - to conclude that the drug most strongly associated with burana is trometamolum? Because of this it makes sense to filter out results with a small sample size.
        </p>



        <p className="faq-question">
          Can't you just lock the minimum sample size to some good value?
        </p>
        <p className="faq-answer">
          We've set the default value to 30, because in our experiments it provided reasonable results for many search queries. However, most search terms yield empty plots with this default value - there simply isn't enough discussion posts to cover all possible connections between rarer drugs and symptoms. We want to offer you the possibility to look at results even when the sample size is too small to draw many conclusions.
        </p>



        <p className="faq-question">
          If I adjust the sample size filter, do the relevance values change?
        </p>
        <p className="faq-answer">
          No. Adjusting the sample size filter does not change relevance values. It only affects which results are shown and which are filtered out.
        </p>


      </div>
    );
  }
}