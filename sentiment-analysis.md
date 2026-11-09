---
layout: home
title: "Sentiment Analysis"
description: "The Subreddit Vibe Check"
date: "Sept 09, 2026"
tags: ["sentiment", "analysis", "subreddit", "vibe"]
lang: en
---

<style>

.controls {
    display: flex;
    gap: 10px;
    margin-bottom: 5px;
}

.controls input:text {
    flex: 1;
    padding: 10px;
    font-size: 16px;
}

.error-msg {
    color: #dc2626;
    font-size: 14px;
    margin-bottom: 15px;
    display: none;
}

.stats {
    display: flex;
    justify-content: space-around;
    background: #f0f0f0;
    padding: 15px;
    border-radius: 8px;
    margin: 20px 0;
}

.post {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
}

.pos {
    color: green;
    font-weight: bold;
}

.neg {
    color: red;
    font-weight: bold;
}

.neu {
    color: gray;
    font-weight: bold;
}
</style>

  <div class="controls">
    <input type="text" id="subredditInput" value="webdev" placeholder="Enter subreddit..." />
    <button id="checkBtn" onclick="checkBtn();" class="btn btn-primary">Check Vibe</button>
  </div>
  <div id="errorText" class="error-msg"></div>

  <div id="results" style="display: none;">
    <div class="stats">
      <div>Overall Score: <span id="totalScore">0</span></div>
      <div>Positive: <span id="posCount" class="pos">0</span></div>
      <div>Neutral: <span id="neuCount" class="neu">0</span></div>
      <div>Negative: <span id="negCount" class="neg">0</span></div>
    </div>
    <div id="postsList"></div>
  </div>

  <script  type="module" >
    import Sentiment from 'https://esm.sh/sentiment@5.0.2';
    const sentiment = new Sentiment();
  </script>
  <script>
    function fetchRedditJSONP(subreddit) {
      return new Promise((resolve, reject) => {
        const callbackName = 'redditCallback_' + Math.random().toString(36).substring(2, 15);
    
        // Define global callback function
        window[callbackName] = function (data) {
          delete window[callbackName];
          document.body.removeChild(script);
          resolve(data);
        };
    
        // Create script tag pointing to Reddit JSONP endpoint
        const script = document.createElement('script');
        script.src = `https://www.reddit.com/r/${subreddit}/hot.json?limit=50&jsonp=${callbackName}`;
        console.info(script.src);
        script.onerror = function () {
          delete window[callbackName];
          document.body.removeChild(script);
          const msg = 'Failed to load Reddit data';
          errorEl.innerText = msg;
          reject(new Error(msg));
        };
    
        document.body.appendChild(script);
      });
    }

    async function checkVibe() {
      const checkBtn = document.getElementById('checkBtn');
      const inputEl = document.getElementById('subredditInput');
      const errorEl = document.getElementById('errorText');
      const subreddit = inputEl.value.trim();
      errorEl.innerText = '';
    
      const subredditPattern = /^[a-zA-Z0-9_]{3,21}$/;
      if (!subredditPattern.test(subreddit)) {
        errorEl.innerText = 'Please enter a valid subreddit name (3-21 characters).';
        return;
      }
    
      try {
        checkBtn.setAttribute('disabled', true);
        const data = await fetchRedditJSONP(subreddit);
        console.info(data);
    
        let pos = 0, neu = 0, neg = 0, totalScore = 0;
        let postsHTML = '';
    
        data.data.children.forEach(child => {
          const title = child.data.title;
          const result = sentiment.analyze(title);
          totalScore += result.score;
    
          let scoreClass = 'neu';
          if (result.score > 0) { pos++; scoreClass = 'pos'; }
          else if (result.score < 0) { neg++; scoreClass = 'neg'; }
          else { neu++; }
    
          postsHTML += `
                <div class="post">
                  <a href="https://reddit.com${child.data.permalink}" target="_blank" rel="noreferrer">${title}</a>
                  <span class="${scoreClass}">${result.score > 0 ? '+' : ''}${result.score}</span>
                </div>
              `;
        });
    
        console.info(`pos = ${pos}, neu = ${neu}, neg = ${neg}, totalScore = ${totalScore}`);
        document.getElementById('totalScore').innerText = totalScore;
        document.getElementById('posCount').innerText = pos;
        document.getElementById('neuCount').innerText = neu;
        document.getElementById('negCount').innerText = neg;
        document.getElementById('postsList').innerHTML = postsHTML;
        document.getElementById('results').style.display = 'block';
        checkBtn.removeAttribute('disabled');
      } catch (err) {
        errorEl.innerText = 'Failed to fetch data. Ensure the subreddit exists.';
        console.error(err);
      }
    }
  </script>
