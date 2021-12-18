import React from 'react'
import {
    Card,
    CardHeader,
    Checkbox,
    Divider,
    List,
    ListItem,
    Grid,
    Button,
    ListItemText,
    ListItemIcon,
} from '@mui/material'
import AssignmentContext from './../../../../../../../context/AssignmentContext';

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1)
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1)
}

function union(a, b) {
    return [...a, ...not(b, a)]
}

export default function TransferQuizList({ questions, randomQuestions }) {
    const { setAssign } = React.useContext(AssignmentContext);

    const [data, setData] = React.useState({
        data1: questions,
        data2: randomQuestions.data,
    })
    const [state, setState] = React.useState(false)
    const [checked, setChecked] = React.useState([])
    const [left, setLeft] = React.useState(data.data1)
    const [right, setRight] = React.useState(data.data2)

    const leftChecked = intersection(checked, left)
    const rightChecked = intersection(checked, right)

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        setState(true)
    }

    const numberOfChecked = (items) => intersection(checked, items).length

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items))
        } else {
            setChecked(union(checked, items))
        }
        setState(true)

    }
    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked))
        setLeft(not(left, leftChecked))
        setChecked(not(checked, leftChecked))
        setState(true)
    }

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked))
        setRight(not(right, rightChecked))
        setChecked(not(checked, rightChecked))
        setState(true)

    }
    React.useEffect(() => {
        if (state.false) {
            let quizSet = new Set(randomQuestions.data)
            let quiz = questions.filter(i => {
                return !quizSet.has(i)
            })
            setData({ data1: quiz, data2: randomQuestions.data })
            setLeft(quiz)
            setRight(randomQuestions.data)
        }

        setAssign(s => { return { ...s, Questions: right } })// eslint-disable-next-line
    }, [right, questions, randomQuestions])
    const customList = (title, items) => (
        <Card sx={{ border: 0, boxShadow: 0, background: '#D6E6F2', }}>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={
                            numberOfChecked(items) === items.length && items.length !== 0
                        }
                        indeterminate={
                            numberOfChecked(items) !== items.length &&
                            numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List
                sx={{
                    height: '30vh',
                    background: '#D6E6F2',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value}-label`
                    return (
                        <ListItem
                            key={value.QuestionID}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.Question} />
                        </ListItem>
                    )
                })}
                <ListItem />
            </List>
        </Card>
    )
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                width: '100%', height: '100%', overflow: 'auto',
            }}
        >
            <Grid item xs={5}>
                {customList('Choices', left)}
            </Grid>
            <Grid item xs={2}>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={5}>
                {customList('Chosen', right)}
            </Grid>
        </Grid>
    )
}
