import React, {useContext, useState} from 'react';
import CategoryRow from "./CategoryRow";
import {CategoryInfo} from "../model/Category";
import styled from "styled-components";
import Link from "next/link";
import {SelectedContext, ThemeContext} from "../components/Layout";


interface Props {
    categories: CategoryInfo[];
}

const CategoriesDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`

const Tools = styled.div`
  display: flex;
  justify-content: space-evenly;
  text-align: center;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 33%;
  margin-left: 10px;
`

export const Title = styled.h2`
  color: ${props => props.color};
  width: 33%;
  transition: 0.5s;
`

const DateDiv = styled.div`
  text-decoration: none;
  cursor: pointer;
  padding: 5px;
  border-left: 1px solid ${props => props.theme.header};
  color: ${props => props.theme.text};
  transition: 50ms;
  width: 33%;
  font-size: 12px;
  margin: 0 5px;
  &:hover {
    font-weight: bold;
  }
  
  &:focus{
    font-weight: bold;
  }

`

const Favs = styled.h2`
  text-align: center;
  color: ${props => props.theme.text};
  cursor: pointer;
  width: 33%;
  transition: 0.5s;
  &:hover {
    color: ${props => props.theme.header};
  }
`

const NoEvents = styled.h2`
  text-align: center;
  padding: 20px;
  color: ${props => props.color};
`


function Categories({categories}: Props) {

    const Selected = useContext(SelectedContext);
    console.log(Selected);

    const Theme = useContext(ThemeContext);

   const [date, setDate] = useState<Date>(new Date());

   const [selectedDate, setSelectedDate] = useState<Date>(new Date());

   function changeSelected(num: number) {
       if(num === 1) Selected.date = new Date(date.getTime() - 24*60*60*1000);
       else if(num === 2) Selected.date = new Date();
       else Selected.date = new Date(date.getTime() + 24*60*60*1000);

       setSelectedDate(Selected.date);

       console.log(Selected.date, new Date(date.getTime() - 24*60*60*1000))
   }

    if (!categories) {
        return <CategoriesDiv>PICK A SPORT</CategoriesDiv>
    }

    if(categories[0] === undefined)
        return <CategoriesDiv><NoEvents color={Theme.text}>No events today.</NoEvents></CategoriesDiv>

        return (

            <CategoriesDiv>
                <Tools>
                    <Buttons>
                        <Link href={`/sport/${categories[0].category.sport.name.toLowerCase()}/${new Date(date.getTime() - 24*60*60*1000).toISOString().split('T')[0]}`}>
                            <DateDiv
                                theme={Theme}
                                onClick={() => changeSelected(1)}>Yesterday</DateDiv>
                        </Link>
                        <Link href={`/sport/${categories[0].category.sport.name.toLowerCase()}/${date.toISOString().split('T')[0]}`}>
                            <DateDiv
                                theme={Theme}
                                onClick={() => changeSelected(2)}>{date.toISOString().split('T')[0]}</DateDiv>
                        </Link>
                        <Link href={`/sport/${categories[0].category.sport.name.toLowerCase()}/${new Date(date.getTime() + 24*60*60*1000).toISOString().split('T')[0]}`}>
                            <DateDiv
                                theme={Theme}
                                onClick={() => changeSelected(3)}>Tomorrow</DateDiv>
                        </Link>
                    </Buttons>
                    <Link href={`/`}><Favs theme={Theme}>Favourites</Favs></Link>
                </Tools>
                {categories
                    .sort((c1,c2) => c2.category.priority-c1.category.priority)
                    .map((category:CategoryInfo) => (

                    <div key={category.category.id}>
                    <CategoryRow categoryInfo={category} />
                    </div>
                ))}
            </CategoriesDiv>
        )
}

export default Categories;
