import * as React from "react";
import { View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import styles from "./styles";

export default class CalenderScreen extends React.Component {
    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text>Bugün için rahat olsun :)</Text>
            </View>
        );
    }

    renderItem(item) {
        const labels =
            item.labels &&
            item.labels.map(label => (
                <View
                    key={`label-${label}`}
                    style={{
                        padding: 5,
                        backgroundColor:
                            label === 'Adet Dönemi' ? colors.primary : colors.secondary,
                        borderRadius: 3,
                    }}
                >
                    <Text style={{ color: 'white' }}>{label}</Text>
                </View>
            ));

        return (
            <View style={styles.item}>
                <View>
                    <Text
                        style={{
                            color: '#48506B',
                            fontFamily: fonts.primaryRegular,
                            marginBottom: 10,
                        }}
                    >
                        {item.name}
                    </Text>
                    <Text style={{ color: '#9B9B9B', fontFamily: fonts.primaryRegular }}>
                        {item.time}
                    </Text>
                </View>

                <View styleName="horizontal h-start">{labels}</View>
            </View>
        );
    }

    render() {
        const { items, loadItems } = this.props;
        return (
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                renderItem={this.renderItem}
                renderEmptyDate={CalendarScreen.renderEmptyDate}
                rowHasChanged={CalendarScreen.rowHasChanged}
                theme={{
                    dotColor: colors.primaryLight,
                    selectedDayBackgroundColor: colors.primaryLight,
                    agendaDayTextColor: colors.primaryLight,
                    agendaDayNumColor: colors.primaryLight,
                    agendaTodayColor: '#4F44B6',
                    backgroundColor: '#F1F1F8',
                }}
            />
        );
    }
}