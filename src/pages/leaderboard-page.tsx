import styled from "styled-components";
import { BsFillStarFill } from "react-icons/bs";

const Title = styled.h1`
  font-size: 96px;
  line-height: 107px;
  text-align: center;
  letter-spacing: -5.76px;
  color: #ffffff;
  font-weight: bold;
`;

const PageWrapper = styled.div`
  padding-top: 157px;
  padding-bottom: 127px;
`;

const Description = styled.p`
  max-width: 743px;
  color: #ffffff;
`;

const RankBox = styled.div`
  width: 384px;
  padding: 32px 38px;
  background: #333333 0% 0% no-repeat padding-box;
  border: 10px solid #191919;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function LeaderboardPage() {
  return (
    <PageWrapper className="lg:container lg:mx-auto lg:px-4 h-full flex flex-col items-center">
      <Title>Leaderboard</Title>
      <Description className="text-center mb-7">
        Discover the Stars of AI! Our Leaderboard showcases the most popular AI
        models, ranked in order of their accuracy, creativity, and
        intelligence—assessed by humans like you.
      </Description>
      <div className="flex gap-8 mb-6">
        <RankBox>
          <img
            src="/assets/images/img-leaderboard-top.png"
            alt="Top"
            width={150}
            className="mb-4"
          />
          <span className="text-white text-lg tracking-[-0.63px] leading-5 mb-1">
            First place
          </span>
          <span className="text-gold text-[28px] leading-8 font-bold">
            gpt-3.5-turbo
          </span>
        </RankBox>
        <RankBox>
          <img
            src="/assets/images/img-leaderboard-runnerup.png"
            alt="Top"
            width={150}
            className="mb-4"
          />
          <span className="text-white text-lg tracking-[-0.63px] leading-5 mb-1">
            Runner up
          </span>
          <span className="text-gold text-[28px] leading-8 font-bold">
            Llama-2-70b-chat-hf
          </span>
        </RankBox>
      </div>
      <div className="container mx-auto">
        <table className="table-auto w-full text-base text-white">
          <thead className="bg-gray text-white text-left font">
            <tr className="h-12 px-6">
              <th className="pl-6">Model</th>
              <th>Wins</th>
              <th>Loses</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-12 bg-[#575757]">
              <td className="pl-12 relative">
                <BsFillStarFill color="#FFC627" className="absolute left-6" />
                <div>gpt-3.5-turbo</div>
              </td>
              <td>456</td>
              <td>234</td>
            </tr>
            <tr className="h-12 bg-[#484848] px-6">
              <td className="pl-12 relative">
                <BsFillStarFill color="#FFC627" className="absolute left-6" />
                <div>Llama-2-70b-chat-hf</div>
              </td>
              <td>456</td>
              <td>234</td>
            </tr>
            <tr className="h-12 bg-[#575757]">
              <td className="pl-12">gpt-3.5-turbo</td>
              <td>456</td>
              <td>234</td>
            </tr>
            <tr className="h-12 bg-[#484848] px-6">
              <td className="pl-12">gpt-3.5-turbo</td>
              <td>456</td>
              <td>234</td>
            </tr>
            <tr className="h-12 bg-[#575757]">
              <td className="pl-12">gpt-3.5-turbo</td>
              <td>456</td>
              <td>234</td>
            </tr>
            <tr className="h-12 bg-[#484848] px-6">
              <td className="pl-12">gpt-3.5-turbo</td>
              <td>456</td>
              <td>234</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
}

export default LeaderboardPage;
