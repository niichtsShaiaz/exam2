import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  withRouter,
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

class Repository extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repo: {},
    id: props.match.params.id,
    }
  }

  componentDidMount() {
     const url = "https://api.github.com/repos/Cphdat3sem2017f/";
     fetch(url+this.state.id)
       .then(response => response.json())
       .then(data => this.setState({ repo: data }))
  }
  render() {

    return (<div>
      {console.log(this.state.repo)}
      <h2>Repository</h2>
      <p>This control should show details for a SINGLE selected repository</p>
      <h1> Data </h1>
      <p> Name: {this.state.repo.name} </p>
      <p> Full name: {this.state.repo.full_name} </p>
      <p> ID: {this.state.repo.id} </p>
      <p> Size: {this.state.repo.size} </p>
    </div>
    )
  }
}

class Repositories extends React.Component {

  constructor(props) {
    super(props);
    this.state = { repos: [] }
  }

  componentWillMount() {
    //This could where you would fetch data. Or not.
  }

  render() {
    const match = this.props.match;
    const url = "https://api.github.com/orgs/CPhdat3sem2017f/repos";
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ repos: data }))

    var allRepos = this.state.repos;
    var linkTable = allRepos.map((repo) => {
      return (  
        <tr scope="row" key={repo.id}>
          <td>{repo.name}  <Link to={`/repository/${repo.name}`}> details</Link></td>
        </tr>
      )
    });

    return (
      <div>
        <h2>Repositories</h2>
        <p>Complete this example to fecth the git-repositories (via link provided in the exercise),
          and populate the ul below with the name for each repository.
        </p>
        <ul>
        </ul>

        <table class="table" key="tableList">
          <tbody>
            <tr>
              <th scope="col">Name</th>
            </tr>
            {linkTable}
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => (
  <Router>
    <div>
      <div>
        <ul className="header">
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to="/repositories">Reposistories</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/repositories" component={Repositories} />
        <Route path="/repository/:id" component={Repository} />

        {/* Add the missing routes here */}
      </Switch>
    </div>
  </Router>
)
export default App
