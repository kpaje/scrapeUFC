function profile(
	results,
	athleteNickname,
	athleteStatus,
	athleteHometown,
	athletePhysicalStats
) {
	Object.assign(results.profile, {
		nickname: athleteNickname[0].innerText,
		status: athleteStatus[0].innerText,
		hometown: athleteHometown[0].innerText,
		physical: athletePhysicalStats[0].innerText,
	});
}

function record(results, athleteWins) {
	Object.assign(results.record, {
		wins: athleteWins[0].innerText,
	});
}

function striking(results, athleteStrikingAccuracy, athleteStrikesLanded) {
	Object.assign(results.striking, {
		strikingAccuracy: athleteStrikingAccuracy[0].innerText,
		athleteStrikesLanded: athleteStrikesLanded[0].innerText,
	});
}

module.exports = {
	profile,
	record,
	striking,
};
