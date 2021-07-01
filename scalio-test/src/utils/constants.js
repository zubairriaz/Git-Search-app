export const url =
	"https://api.github.com/search/users?q={login} in:login&per_page=9";
export const SET_ITEM = "APP/ADD_ITEMS";
export const SET_ISLOADING = "APP/IS_LOADING";
export const SET_ERROR_MESSAGE = "APP/SET_ERROR_MESSAGE";

export const PAGE_LIMT = 9;

export const columns = [
	{
		id: 1,
		key: "avatar_url",
        name:"Avatar",
        isSorted:false,
        isSortedAgain:false,
		onRender: (item) => {
			return (
				<img
                    width="50px"
                    height="50px"
					src={item["avatar_url"]}
					alt="avatar_url"
				></img>
			);
		},
	},
	{ id: 2, key: "login",name:"Login", isSorted: true,isSortedAgain:false },
	{ id: 3, name:"Type",key: "type",isSorted:false,isSortedAgain:false },
];
