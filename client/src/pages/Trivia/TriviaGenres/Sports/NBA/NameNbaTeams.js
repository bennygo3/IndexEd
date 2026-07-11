import TeamGuesserTrivia from "../../../../../components/TeamGuesserTrivia/TeamGuesser";

export default function NameNbaTeams() {
    return (
        <TeamGuesserTrivia
            league="nba"
            title="Fill in each NBA team"
            totalTeams={30}
            gameTime={240}
        />
    );
}
