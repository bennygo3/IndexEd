import TeamGuesserTrivia from "../../../../../components/TeamGuesserTrivia/TeamGuesser";

export default function NameNflTeams() {
    return (
        <TeamGuesserTrivia
            league="nfl"
            title="Fill in each NFL team"
            totalTeams={32}
            gameTime={240}
        />
    );
}