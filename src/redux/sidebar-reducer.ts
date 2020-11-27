type friendType = {
  logoSrc: string
  name: string
  id: number
}

let initialState = {
    friendsOnline: [
        {logoSrc:'http://рик-и-морти.рф/wp-content/uploads/2017/02/%D0%9A%D0%BE%D0%B2%D0%B1%D0%BE%D0%B9-%D0%A0%D0%B8%D0%BA-%D0%BA%D1%80%D1%83%D0%BF%D0%BD%D1%8B%D0%B9-%D0%BF%D0%BB%D0%B0%D0%BD.jpg' ,name: 'Rick', id:1},
        {logoSrc:'http://рик-и-морти.рф/wp-content/uploads/2016/11/%D0%9A%D0%BE%D1%80%D0%BE%D0%BB%D1%8C-%D0%9F%D0%BB%D1%83%D1%82%D0%BE%D0%BD%D0%B0.jpg' ,name: 'King Plutie', id:2},
        {logoSrc:'https://vignette.wikia.nocookie.net/rickandmorty/images/e/ec/%D0%9E%D0%B3%D1%83%D1%80%D1%87%D0%B8%D0%BA_%D0%A0%D0%B8%D0%BA_002.jpg/revision/latest/scale-to-width-down/340?cb=20170808193211&path-prefix=ru' ,name:'Cucumber', id:3},
        {logoSrc:'https://pbs.twimg.com/profile_images/640562675307708416/XGzlRdo9_400x400.png' ,name: 'Bird', id:4},
        {logoSrc:'http://рик-и-морти.рф/wp-content/uploads/2016/09/%D0%92%D0%BE%D1%80%D0%BE%D0%B2%D0%B0%D0%B9%D1%87%D0%B8%D0%BA.jpg' ,name:'Creep', id:5}
    ] as Array<friendType> | null
};

export type initialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): initialStateType => {
    return state;
}

export default sidebarReducer;