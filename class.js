class Athlete {
	constructor(
		athleteNickname,
		athleteStatus,
		athleteHometown,
		athletePhysicalStats,
		athleteWins,
		athleteStrikingAccuracy,
		athleteStrikesLanded
	) {
		this.athleteNickname = athleteNickname;
		this.athleteStatus = athleteStatus;
		this.athleteHometown = athleteHometown;
		this.athletePhysicalStats = athletePhysicalStats;
		this.athleteWins = athleteWins;
		this.athleteStrikingAccuracy = athleteStrikingAccuracy;
		this.athleteStrikesLanded = athleteStrikesLanded;
	}

	createProfile() {
		let results = [];
		results = {
			nickname: this.athleteNickname[0].innerText,
			status: this.athleteStatus[0].innerText,
			hometown: this.athleteHometown[0].innerText,
			physical: this.athletePhysicalStats[0].innerText,
			wins: this.athleteWins[0].innerText,
			strikingAccuracy: this.athleteStrikingAccuracy[0].innerText,
			strikesLanded: this.athleteStrikesLanded[0].innerText,
		};

		return results;
	}
}

module.exports = Athlete;
