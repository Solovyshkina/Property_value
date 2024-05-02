import dash
from dash import dcc
from dash import html
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import numpy as np

app = dash.Dash(__name__)

data = pd.read_excel('property_value_data.xlsx')
data = data.loc[data['price'] < 400000000]
data = data.loc[data['rooms'] != '0.5']
data = data.loc[data['district'] != 'р-н Кронштадтский']
data['toilet'].replace(0, 1, inplace=True)
#data.replace({'toilet': 1}, inplace=True)

df_corr = data.select_dtypes(include=['float64', 'int64']).corr()

# scatter = px.scatter(
#    data_frame=data,
#    x="price",
#    y="year_at_home",
#    color="rooms",
#    title="Year of building vs. Price of flat",
#    width=1200,
#    height=900,
#    labels={'price': 'Price', 'year_at_home': 'Year'}
# )
scatter = go.Figure(data=[
    go.Scatter(
        x=data['price'],
        y=data['year_at_home'],
        mode='markers'
    ),
    go.Scatter(
        name="Meters",
        x=data['price'],
        y=data['meters'],
        mode='markers'
    ),
    go.Scatter(
        name="Time",
        x=data['price'],
        y=data['average_time'],
        mode='markers'
    )
])

scatter.update_layout(
   updatemenus=[
           dict(
               active=0,
               buttons=list([
                   dict(
                       label="Year of home",
                       method="update",
                       args=[{"visible": [True, False, False]},
                             {"title": "Price vs Year"}]
                   ),
                   dict(
                        args=[{"visible": [False, True, False]},
                              {"title": "Price vs Meters"}],
                        label="Meters",
                        method="update"
                   ),
                   dict(
                        args=[{"visible": [False, False, True]},
                              {"title": "Price vs Time to the subway"}],
                        label="Subway",
                        method="update"
                   )
               ]),
               direction="down",
               ),
             ],
   title="A Simple Scatter Plot",
   width=1200,
   height=900
)

histogram = px.histogram(
   data_frame=data,
   x="district",
   title="Histogram of flat districts",
   width=900,
   height=900,
   labels={'district': 'District'}
)

heatmap = go.Figure(data=go.Heatmap(
   x=df_corr.columns,
   y=df_corr.index,
   z=np.array(df_corr),
))
heatmap.update_layout(
    width=900,
    height=900
)
box_plot = px.box(
   data_frame=data,
   y="price",
   x='district',
   width=900,
   height=900
)


left_fig = html.Div(children=dcc.Graph(figure=scatter))
right_fig = html.Div(children=dcc.Graph(figure=histogram))
bot_fig_1 = html.Div(children=dcc.Graph(figure=heatmap))
bot_fig_2 = html.Div(children=dcc.Graph(figure=box_plot))


#upper_div = html.Div(left_fig, style={"display": "flex", "justify-content": "center"})
central_div = html.Div([left_fig, right_fig], style={"display": "flex", "justify-content": "center"})
bottom_div = html.Div([bot_fig_1, bot_fig_2], style={"display": "flex", "justify-content": "center"})

app.layout = html.Div([central_div, bottom_div])

if __name__ == "__main__":
    app.run_server(debug=True)
