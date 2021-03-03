import React, {Component} from 'react'
import Member from './components/Member.js';
import getFakeMembers from './components/GetFakeMembers.js';

class MemberList extends Component {
	constructor() {
		super()
		this.state = {
			members: [],
			loading: false,
			error: null
		}
	}
	UNSAFE_componentWillMount() {
		this.setState({loading: true})
		getFakeMembers(this.props.count).then(
			members => {
				this.setState({members, loading: false})
			},
			error => {
				this.setState({error, loading: false})
			}
		)
	}
	
	UNSAFE_componentWillUpdate() {
		console.log('updating lifecycle')
	}
	
	render() {
	const { members, loading, error } = this.state
	return (
		<div className="member-list">
			{(loading) ?
				<span>Loading Members</span> :
				(members.length) ?
					members.map((user, i) =>
						<Member key={i} {...user} />
					) :
					<span>0 members loaded...</span>
			}
			{(error) ? <p>Error Loading Members: error</p> : ""}
		</div>
		)
	}
}

export default MemberList;