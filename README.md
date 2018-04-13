# Interactive Resume Generator

This is a ReactJS / NodeJS based Interactive Resume generator. For a working website, see https://vasya10-resume.herokuapp.com/

This project is bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). It relies on the following technologies:

- [JSON Resume Standard](https://jsonresume.org/)
- [ReactJS](http://github.com/facebook/reactjs)
- Google Material Design using [Material UI](http://www.material-ui.com)
- [D3 v4](http://d3js.org)
- [Vis JS](http://visjs.org)

## Motivation

* Having interviewed over 100s of candidates during my career, I feel the resume presentation has hardly changed over the years. 
* It is typically a reverse chronological items of what your role is and chosen technology stack is. 
* Many candidates do not even pass the four minimum resume qualifications: **Clarity, Presentation, Format, Spellcheck**. 
* Even with portals like LinkedIn, Github providing a lot of information about the candidate, a resume is still considered *the personal window* to a candidate's career. 
* I wish I could say look up me on Twitter, Github and LinkedIn, but that's not sufficient, because the resume allows me to present myself the way I want. 
* At the same time, static resumes are hardly appealing, especially for experienced professionals, because it cannot do justice to their accumulated experience. 
* Most resumes offer data about roles and responsibilities, but they do not tell how **the experience was accumulated**.

So this is just a simple attempt to make your resumes more interactive closely following industry standards. 
It gives an opportunity for the hiring company or the interviewer to understand you better.


## Getting Started

### Tools

-  NodeJS 8.x, create-react-app, yarn, NVM (recommended), Docker (optional)

### Installation

#### Manual

If you have not installed NodeJS, I recommend installing it via [NVM](https://github.com/creationix/nvm). NVM lets you easily install and switch between NodeJS versions. If you have an old version of NodeJS installed (0.12, 4.x etc.) I recommend uninstalling them completely and then install NVM.

```
npm install -g create-react-app
brew install yarn
git clone https://github.com/vasya10/resume-md
cd resume-md
yarn install
yarn start
```

This will open your default browser and will display a standard resume at http://localhost:3000

#### Dockerfile

If you do not want to install NodeJS tools locally, you can run the app via Docker. This is a much simpler option.

Download and install Docker CE
Run the make targets to build and run. If you dont have make, simply run the shell scripts in the target.

```sh
# will create a docker image and run it at port 3000
make build
make run
```

### Updating the resume

Edit the `./data/resume.json` file and add your own content. Run `yarn start` to see your resume. Create React App compiles on the fly, so any changes are immediately picked up and rendered.

### Themes

In the `./data` folder, there is a `theme-default.json`. The material ui components can be themed by following and overriding values as given in [Material UI Theme Source](https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js). The generator uses the following Material UI components - AppBar, Chip, Card, FontIcon, Paper, Avatar.

In addition, there are some more styles defined in app.css. Modify them to get your desired outlook.


## Features

The resume-md generator reads the ./data/resume.json file and displays them in different sections. The following table shows how each section is displayed:

| JSON section   | How displayed |
|----------------|---------------|
| basics/profile | Header and Footer        |
| work           | Vis JS Timeline chart, using startDate and endDate |
| volunteer      | Bullet List   |
| education      | Bullet List   |
| awards         | Cards         |
| publications   | Bullet List   |
| skills         | Skills Acquired Chips |
| skills         | Skills Applied Bullet List |
| languages      | Rain Meter    |
| interests      | Vis JS Graph  |
| references     | Bullet List   |
| about me       | Cards         |
| global events  | Points in Vis JS Timeline |
| patents        | Bullet List   |
| training       | Horizontal List |
| myweek         | D3 JS Donut Chart |

### Interactive features

The generator provides a few of interactive features. The interactive features address three common issues I have seen with resumes:

| Problem | Problem Reason | Solution |
|---------|----------------|----------|
| Too long | I have seen resumes that run 10 pages long and it is really hard to figure what the candidate is looking for | See the experience as a timeline, rather than a list of events. The generator displays only the most relevant information, while allowing interviewer to on-demand access further details |
| Only latest experience matters |  It is a generally accepted rule while interviewing, that your current/last project is the most relevant experience. People tend to forget the job experiences from previous works, but it is the experience that is accumulated over years that makes a professional. Cases where candidates are hired based on knowledge from say, 10 years ago are rare. | In the project timeline, only the latest experience is shown. But you can click on previous projects, which displays that work experience side by side with your current project. So in effect a past experience is displayed in relation to the current experience, yet conserves space. |
| Skills Applied over the years | This is almost never evident in resumes. A candidate may have worked on Python in 2/3 projects, but how did that experience evolve? | The generator displays the skills as a series of chips. If you click on a chip, the text is searched across the Work experience (hightlights and summary), Awards and Patents and displayed on the right. So the interviewer can quickly look at how a certain skill was accumulated or applied over the years. This also enables the candidate to develop the resume in a certain way, so its information can be relationally gathered. |


## Custom JSON extensions

The project also adds a few custom sections not found in the original JSON Schema. The original json schema is unaltered, so only new attributes are added. All custom sections are optional, so if you do not specify them, the corresponding section wont be rendered.

| Custom extension | Feature |
|------------------|---------|
| about me | Displays the 3 cards at the top of the page, which in the given example, answers three questions: Who you are, What motivates you to work and What are you looking for). You can put up whatever content you want here, but try to keep it to 3 sections.
| global events | Displayed along with the project timeline. It gives a perspective of what happened in the world along with your career. You can choose to add any event, that is relevant to your resume, just to spice up the perspective |
| patents | Section for displaying patents |
| training | Section for any training that you have attended. To conserve space, it is displayed horizontally |
| my week | Gives a perspective of how you time manage using a Donut chart |


## Deploy

Once your satisfied with the generated resume, you can deploy it to any NodeJS hosted (or self host) environment.

Below are instructions for setting this up in Heroku.

### Deploying to Heroku

1. Create an [Heroku account](http://www.heroku.com)
2. Download and install Heroku CLI
3. Open your terminal and login to heroku: `heroku login`
4. Create the app, but remember to use the excellent utility create-react-app-buildpack for heroku: `heroku create ${webapp-name} --buildpack https://github.com/mars/create-react-app-buildpack.git`. For eg, if your webapp-name is my-resume, it will be deployed at my-resume.herokuapp.com.
5. The create-react-app buildpack is required for installing create-react-app in the heroku system, and to build target (distro) files out of it. Without this buildpack, heroku will not be able to build the generator.
6. `git remote add heroku git@heroku.com:webapp-name.git`
7. `git push heroku master`  #This will automatically build and publish to $webapp-name.herokuapp.com

If you run into trouble with Keys/Permission, push your public keys to heroku:

8. `heroku keys:clear`
9. `heroku keys:add ~/.ssh/id_rsa.pub`

To check app deployment and runtime logs:

10. `heroku logs --tail`

## Export

To export as PDF, from your browser menu, save the HTML as PDF. Most of the time it would generate a properly formatted pdf. But some formatting has been found to be inconsistent. You may have to adjust the styles to get a PDF to your satisfaction.
