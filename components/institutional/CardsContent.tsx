import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  cardsPrimary: {
    image: ImageWidget;
    title: string;
    links: {
      label: string;
      url: string;
    };
  }[];

  cardsSecondary: {
    title: string;
    links: {
      label: string;
      url: string;
    };
  }[];
}

function CardsContent({ cardsPrimary, cardsSecondary }: Props) {
  return (
    <div className="institucional-content__main-content">
      <h4 className="relative uppercase lg:text-lg  font-bold after:bg-[#c41c17] after:absolute after:right-0 after:w-[95%] after:h-[2px] after:bottom-[-5px] lg:after:w-[380px] lg:after:left-5">
        Escolha o manual para download
      </h4>
      <ul className="destaque">
        {cardsPrimary.map(({ links, title, image }) => (
          <li className="flex justify-between lg:flex-col">
            <img src={image} alt={title}></img>
            <a
              target="_blank"
              href={links.url}
              style={{ backgroundPosition: "10px center" }}
              className="block pl-5 text-center w-[165px] h-[37px] text-xs uppercase text-black hover:text-white md:mt-7 border-[1px] border-black hover:border-white leading-9  bg-no-repeat bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ij4KCTxkZWZzPgoJCTxpbWFnZSB3aWR0aD0iNDkxIiBoZWlnaHQ9IjQ5MSIgaWQ9ImltZzEiIGhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaWFYTnZMVGc0TlRrdE1TSS9QZzBLUENFdExTQkhaVzVsY21GMGIzSTZJRUZrYjJKbElFbHNiSFZ6ZEhKaGRHOXlJREU1TGpBdU1Dd2dVMVpISUVWNGNHOXlkQ0JRYkhWbkxVbHVJQzRnVTFaSElGWmxjbk5wYjI0NklEWXVNREFnUW5WcGJHUWdNQ2tnSUMwdFBnMEtQSE4yWnlCMlpYSnphVzl1UFNJeExqRWlJR2xrUFNKRFlYQmhYekVpSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUlnZUcxc2JuTTZlR3hwYm1zOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6RTVPVGt2ZUd4cGJtc2lJSGc5SWpCd2VDSWdlVDBpTUhCNElnMEtDU0IyYVdWM1FtOTRQU0l3SURBZ05Ea3dMalFnTkRrd0xqUWlJSE4wZVd4bFBTSmxibUZpYkdVdFltRmphMmR5YjNWdVpEcHVaWGNnTUNBd0lEUTVNQzQwSURRNU1DNDBPeUlnZUcxc09uTndZV05sUFNKd2NtVnpaWEoyWlNJK0RRbzhaejROQ2drOFp6NE5DZ2tKUEhCaGRHZ2daRDBpVFRRNU1DNDBMREkwTlM0eVF6UTVNQzQwTERFeE1Dd3pPREF1TkN3d0xESTBOUzR5TERCVE1Dd3hNVEFzTUN3eU5EVXVNbk14TVRBc01qUTFMaklzTWpRMUxqSXNNalExTGpKVE5Ea3dMalFzTXpnd0xqUXNORGt3TGpRc01qUTFMako2SUUweU5DNDFMREkwTlM0eURRb0pDUWxqTUMweE1qRXVOeXc1T1MweU1qQXVOeXd5TWpBdU55MHlNakF1TjNNeU1qQXVOeXc1T1N3eU1qQXVOeXd5TWpBdU4zTXRPVGtzTWpJd0xqY3RNakl3TGpjc01qSXdMamRUTWpRdU5Td3pOall1T1N3eU5DNDFMREkwTlM0eWVpSXZQZzBLQ1FrOGNHRjBhQ0JrUFNKTk1qVXpMamtzTXpZd0xqUnNOamd1T1MwMk9DNDVZelF1T0MwMExqZ3NOQzQ0TFRFeUxqVXNNQzB4Tnk0emN5MHhNaTQxTFRRdU9DMHhOeTR6TERCc0xUUTRMRFE0VmpFek9DNDNZekF0Tmk0NExUVXVOUzB4TWk0ekxURXlMak10TVRJdU13MEtDUWtKY3kweE1pNHpMRFV1TlMweE1pNHpMREV5TGpOMk1UZ3pMalJzTFRRNExUUTRZeTAwTGpndE5DNDRMVEV5TGpVdE5DNDRMVEUzTGpNc01ITXROQzQ0TERFeUxqVXNNQ3d4Tnk0emJEWTRMamtzTmpndU9XTXlMalFzTWk0MExEVXVOU3d6TGpZc09DNDNMRE11TmcwS0NRa0pVekkxTVM0MUxETTJNaTQ0TERJMU15NDVMRE0yTUM0MGVpSXZQZzBLQ1R3dlp6NE5Dand2Wno0TkNqeG5QZzBLUEM5blBnMEtQR2MrRFFvOEwyYytEUW84Wno0TkNqd3ZaejROQ2p4blBnMEtQQzluUGcwS1BHYytEUW84TDJjK0RRbzhaejROQ2p3dlp6NE5DanhuUGcwS1BDOW5QZzBLUEdjK0RRbzhMMmMrRFFvOFp6NE5Dand2Wno0TkNqeG5QZzBLUEM5blBnMEtQR2MrRFFvOEwyYytEUW84Wno0TkNqd3ZaejROQ2p4blBnMEtQQzluUGcwS1BHYytEUW84TDJjK0RRbzhaejROQ2p3dlp6NE5Dand2YzNablBnMEsiLz4KCTwvZGVmcz4KCTxzdHlsZT4KCQl0c3BhbiB7IHdoaXRlLXNwYWNlOnByZSB9Cgk8L3N0eWxlPgoJPHVzZSBpZD0iZG93bi1hcnJvdyIgaHJlZj0iI2ltZzEiIHRyYW5zZm9ybT0ibWF0cml4KDAuMDMyLDAsMCwwLjAzMiwwLDApIi8+Cjwvc3ZnPg==')]  hover:bg-[#c41c17] hover:bg-[url('https://technos.vteximg.com.br/arquivos/down-arrow_white.png')]"
            >
              {links.label}
            </a>
          </li>
        ))}
      </ul>
      <ul className="secundario flex-wrap min-w-full md:min-w-[871px] mt-12 max-w-full ml-0 mb-0 mr-auto lg:mt-12 ma lg:flex lg:justify-between">
        {cardsSecondary.map(({ links, title }) => (
          <li className="block font-semibold mb-10">
            {title}
            <a
              target="_blank"
              href={links.url}
              style={{ backgroundPosition: "10px center" }}
              className="block pl-5 text-center w-[165px] h-[37px] text-xs uppercase text-black hover:text-white mt-2 border-[1px] border-black hover:border-white leading-9  bg-no-repeat bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ij4KCTxkZWZzPgoJCTxpbWFnZSB3aWR0aD0iNDkxIiBoZWlnaHQ9IjQ5MSIgaWQ9ImltZzEiIGhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaWFYTnZMVGc0TlRrdE1TSS9QZzBLUENFdExTQkhaVzVsY21GMGIzSTZJRUZrYjJKbElFbHNiSFZ6ZEhKaGRHOXlJREU1TGpBdU1Dd2dVMVpISUVWNGNHOXlkQ0JRYkhWbkxVbHVJQzRnVTFaSElGWmxjbk5wYjI0NklEWXVNREFnUW5WcGJHUWdNQ2tnSUMwdFBnMEtQSE4yWnlCMlpYSnphVzl1UFNJeExqRWlJR2xrUFNKRFlYQmhYekVpSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUlnZUcxc2JuTTZlR3hwYm1zOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6RTVPVGt2ZUd4cGJtc2lJSGc5SWpCd2VDSWdlVDBpTUhCNElnMEtDU0IyYVdWM1FtOTRQU0l3SURBZ05Ea3dMalFnTkRrd0xqUWlJSE4wZVd4bFBTSmxibUZpYkdVdFltRmphMmR5YjNWdVpEcHVaWGNnTUNBd0lEUTVNQzQwSURRNU1DNDBPeUlnZUcxc09uTndZV05sUFNKd2NtVnpaWEoyWlNJK0RRbzhaejROQ2drOFp6NE5DZ2tKUEhCaGRHZ2daRDBpVFRRNU1DNDBMREkwTlM0eVF6UTVNQzQwTERFeE1Dd3pPREF1TkN3d0xESTBOUzR5TERCVE1Dd3hNVEFzTUN3eU5EVXVNbk14TVRBc01qUTFMaklzTWpRMUxqSXNNalExTGpKVE5Ea3dMalFzTXpnd0xqUXNORGt3TGpRc01qUTFMako2SUUweU5DNDFMREkwTlM0eURRb0pDUWxqTUMweE1qRXVOeXc1T1MweU1qQXVOeXd5TWpBdU55MHlNakF1TjNNeU1qQXVOeXc1T1N3eU1qQXVOeXd5TWpBdU4zTXRPVGtzTWpJd0xqY3RNakl3TGpjc01qSXdMamRUTWpRdU5Td3pOall1T1N3eU5DNDFMREkwTlM0eWVpSXZQZzBLQ1FrOGNHRjBhQ0JrUFNKTk1qVXpMamtzTXpZd0xqUnNOamd1T1MwMk9DNDVZelF1T0MwMExqZ3NOQzQ0TFRFeUxqVXNNQzB4Tnk0emN5MHhNaTQxTFRRdU9DMHhOeTR6TERCc0xUUTRMRFE0VmpFek9DNDNZekF0Tmk0NExUVXVOUzB4TWk0ekxURXlMak10TVRJdU13MEtDUWtKY3kweE1pNHpMRFV1TlMweE1pNHpMREV5TGpOMk1UZ3pMalJzTFRRNExUUTRZeTAwTGpndE5DNDRMVEV5TGpVdE5DNDRMVEUzTGpNc01ITXROQzQ0TERFeUxqVXNNQ3d4Tnk0emJEWTRMamtzTmpndU9XTXlMalFzTWk0MExEVXVOU3d6TGpZc09DNDNMRE11TmcwS0NRa0pVekkxTVM0MUxETTJNaTQ0TERJMU15NDVMRE0yTUM0MGVpSXZQZzBLQ1R3dlp6NE5Dand2Wno0TkNqeG5QZzBLUEM5blBnMEtQR2MrRFFvOEwyYytEUW84Wno0TkNqd3ZaejROQ2p4blBnMEtQQzluUGcwS1BHYytEUW84TDJjK0RRbzhaejROQ2p3dlp6NE5DanhuUGcwS1BDOW5QZzBLUEdjK0RRbzhMMmMrRFFvOFp6NE5Dand2Wno0TkNqeG5QZzBLUEM5blBnMEtQR2MrRFFvOEwyYytEUW84Wno0TkNqd3ZaejROQ2p4blBnMEtQQzluUGcwS1BHYytEUW84TDJjK0RRbzhaejROQ2p3dlp6NE5Dand2YzNablBnMEsiLz4KCTwvZGVmcz4KCTxzdHlsZT4KCQl0c3BhbiB7IHdoaXRlLXNwYWNlOnByZSB9Cgk8L3N0eWxlPgoJPHVzZSBpZD0iZG93bi1hcnJvdyIgaHJlZj0iI2ltZzEiIHRyYW5zZm9ybT0ibWF0cml4KDAuMDMyLDAsMCwwLjAzMiwwLDApIi8+Cjwvc3ZnPg==')]  hover:bg-[#c41c17] hover:bg-[url('https://technos.vteximg.com.br/arquivos/down-arrow_white.png')]"
            >
              {links.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardsContent;
